<?php
/**
 *
 * Clipboard Image. An extension for the phpBB Forum Software package.
 *
 * @copyright (c) 2019 Jakub Senko
 * @license GNU General Public License, version 2 (GPL-2.0)
 *
 */

if (!defined('IN_PHPBB'))
{
	exit;
}

if (empty($lang) || !is_array($lang))
{
	$lang = array();
}

$lang = array_merge($lang, array(
	'CLIPBOARDIMAGE_COPY'	=> 'Your clipboard contains both text and image. What item do you want to paste?',
	'CLIPBOARDIMAGE_TEXT'	=> 'Text',
	'CLIPBOARDIMAGE_IMAGE'	=> 'Image',
	'CLIPBOARDIMAGE_BOTH'	=> 'Both',
));
