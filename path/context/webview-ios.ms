.contexts().then(arr => {
  return driver.context(arr[arr.length - 1]);
})