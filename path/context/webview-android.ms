.contexts().then(arr => {
	return driver.context(arr[arr.length - 1]);
})
.windowHandles()
.then(handles => {
	if (handles.length > 1) {
	return driver.window(handles[handles.length - 1]);
	}
})
.sleep(1000)