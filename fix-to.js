const fs = require('fs')

const readDirectory = (path) =>
  new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      if (err) reject(err)

      resolve(files)
    })
  })

const readFile = (path) =>
  new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) reject(err)

      resolve(data)
    })
  })

const writeFile = (path, data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, data, (err) => {
      if (err) reject(err)

      resolve(true)
    })
  })

const isDirectory = (path) => fs.lstatSync(path).isDirectory()

const mergePath = (prev, next) => prev + '/' + next

const classifyObjects = (objects) =>
  objects.reduce(
    (classification, target) => {
      const { files, directories } = classification

      return isDirectory(target)
        ? { ...classification, directories: [...directories, target] }
        : { ...classification, files: [...files, target] }
    },
    { files: [], directories: [] }
  )

const readDirectoriesRecursively = async (parentPath, testRegex, excludeRegex) => {
  if (!parentPath) {
    return []
  }

  const childPathes = await readDirectory(parentPath)
  const mergedPathes = childPathes.map((path) => mergePath(parentPath, path))
  const { files, directories } = classifyObjects(mergedPathes)

  const matchesFiles = files.filter((file) => (testRegex ? testRegex.test(file) : true))

  const matchedDirectories = directories.filter((dir) => (excludeRegex ? !excludeRegex.test(dir) : true))
  const readingDirectoriesPromises = matchedDirectories.map((dir) =>
    readDirectoriesRecursively(dir, testRegex, excludeRegex)
  )

  const results = await Promise.all(readingDirectoriesPromises)

  return [...matchesFiles, ...results.flat()]
}

const replaceFileText = async (path, fromRegex, toText) => {
  const fileData = await readFile(path)
  const updatedData = fileData.replace(new RegExp(fromRegex, 'g'), toText)

  await writeFile(path, updatedData)
}

const run = async () => {
  const root = '.'
  const test = /\.md/
  const exclude = /div/

  const filePathes = await readDirectoriesRecursively(root, test, exclude)

  const fromRegex = /tag:.*\[.*\]/
  const toText = 'category: \"All\"\ndraft: true'

  const replacingPromises = filePathes.map((path) => replaceFileText(path, fromRegex, toText))

  await Promise.all(replacingPromises)

  console.log('End')
}

run()
