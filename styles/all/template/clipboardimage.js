window.addEventListener('paste', function(e) {
	if (e.clipboardData === false || e.clipboardData.items == false) {
		return;
	}

	var items = e.clipboardData.items;
	for (var i = 0; i < items.length; i++) {
		if (items[i].type.indexOf('image') == -1) {
			continue;
		}

		phpbb.plupload.uploader.addFile(items[i].getAsFile());
	}
	phpbb.plupload.uploader.start();
});
