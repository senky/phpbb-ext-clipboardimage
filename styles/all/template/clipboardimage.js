(function(window, $, phpbb, text_name) {
	'use strict';

	var text,
		images,
		uploadImages = function() {
			$.each(images, function(_, image) {
				phpbb.plupload.uploader.addFile(image);
			});
			phpbb.plupload.uploader.start();
		},
		preventDefaultAndRemovePopup = function(e) {
			e.preventDefault();
			removePopup();
		},
		displayPopup = function() {
			$('[name="' + text_name + '"]').after('<div id="paste-popup" style="display:none">' + senky_clipboardimage_lang.copy + '<br><br><a href="#" id="paste-text" class="button2">' + senky_clipboardimage_lang.text + '</a> <a href="#" id="paste-image" class="button2">' + senky_clipboardimage_lang.image + '</a> <a href="#" id="paste-both" class="button2">' + senky_clipboardimage_lang.both + '</a></div>');

			$('#paste-text').on('click', function(e) {
				preventDefaultAndRemovePopup(e);
				insert_text(text);
			});
			$('#paste-image').on('click', function(e) {
				preventDefaultAndRemovePopup(e);
				uploadImages();
			});
			$('#paste-both').on('click', function(e) {
				preventDefaultAndRemovePopup(e);
				insert_text(text);
				uploadImages();
			});

			$('#paste-popup').slideDown();
		},
		removePopup = function() {
			$('#paste-popup').slideUp(400, function() {
				$(this).remove();
			});
		};

	// for unknown reason jQuery listener won't expose clipboardData
	window.addEventListener('paste', function(e) {
		var clipboardData = e.clipboardData || window.clipboardData;
		if (clipboardData === false || clipboardData.items == false) {
			return;
		}
		text = String(clipboardData.getData('text'));

		// test whether there is a mix of text and images in the clipboard
		// along the way, store data into variables for further use even
		// when user flushes the clipboard
		images = [];
		$.each(clipboardData.items, function(_, item) {
			if (item.type.indexOf('image') != -1) {
				images.push(item.getAsFile());
			}
		});

		// don't paste text when we have to decide what to do
		if (text.length && images.length) {
			e.preventDefault();
			displayPopup();
		}

		// no text - just upload images
		if (!text.length) {
			uploadImages();
		}
	
		// no image but some text here - let the browser do its job
	});
})(window, jQuery, phpbb, text_name);

// place new image inline
phpbb.plupload.uploader.bind('FileUploaded', function(_, file, response) {
	try {
		json = JSON.parse(response.response);
		if (typeof json.title === 'undefined' && !json.error && file.status === plupload.DONE) {
			attachInline(phpbb.plupload.getIndex(json.data[0].attach_id), json.data[0].real_filename);
		}
	} catch (e) {}
});
