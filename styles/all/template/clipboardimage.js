(function(window, $, phpbb, text_name) {
	'use strict';

	var text,
		images,
		uploadImages = function() {
			phpbb.plupload.uploader.addFile(images);
			phpbb.plupload.uploader.start();
		},
		preventDefaultAndRemovePopup = function(e) {
			e.preventDefault();

			var popup = $('.popup-fixed').length ? '.popup-fixed' : '#paste-popup';
			$(popup).slideUp(400, function() {
				$(this).remove();
			});
		},
		displayPopup = function() {
			var $textarea = $('[name="' + text_name + '"]');
			$textarea.after('<div id="paste-popup" style="display:none">' + senky_clipboardimage_lang.copy + '<br><br><a href="#" id="paste-text" class="button2">' + senky_clipboardimage_lang.text + '</a> <a href="#" id="paste-image" class="button2">' + senky_clipboardimage_lang.image + '</a> <a href="#" id="paste-both" class="button2">' + senky_clipboardimage_lang.both + '</a></div>');

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

			// in case popup would be hidden below viewport, make it fixed
			var viewportTop = $(window).scrollTop(),
				viewportBottom = viewportTop + $(window).height(),
				$popup = $('#paste-popup'),
				popupTop = $textarea.offset().top + $textarea.outerHeight();
			if (popupTop > viewportBottom) {
				$popup.addClass('panel bg2').css({
					zIndex: 999,
					position: 'fixed',
					bottom: 0
				});
			}

			$('#paste-popup').slideDown();
		};

	$(window).on('paste', function(e) {
		var clipboardData = e.originalEvent.clipboardData || window.clipboardData;
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

	// place new image inline
	phpbb.plupload.uploader.bind('FileUploaded', function(_, file, response) {
		// Make sure this image comes from the clipboard.
		// Otherwise do not inline the attachment.
		var clipboardImg = images.find(function(img) {
			return img.name == file.name && img.size == file.origSize;
		});
		if (!clipboardImg) {
			return;
		}

		try {
			var json = JSON.parse(response.response);
			if (typeof json.title === 'undefined' && !json.error && file.status === plupload.DONE) {
				attachInline(phpbb.plupload.getIndex(json.data[0].attach_id), json.data[0].real_filename);
			}
		} catch (e) {console.log(e)}
	});
})(window, jQuery, phpbb, text_name);
