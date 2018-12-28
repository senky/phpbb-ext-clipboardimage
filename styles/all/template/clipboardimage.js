// handle paste event
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

// place new image inline
phpbb.plupload.uploader.bind('FileUploaded', function(up, file, response) {
	try {
		json = JSON.parse(response.response);
		if (typeof json.title === 'undefined' && !json.error && file.status === plupload.DONE) {
			attachInline(phpbb.plupload.getIndex(json.data[0].attach_id), json.data[0].real_filename);
		}
	} catch (e) {}
});
