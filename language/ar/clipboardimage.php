<?php
/**
 *
 * Clipboard Image. An extension for the phpBB Forum Software package.
 *
 * @copyright (c) 2019 Jakub Senko
 * @license GNU General Public License, version 2 (GPL-2.0)
 *
 * Translated By : Bassel Taha Alhitary <http://www.alhitary.net>
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
	'CLIPBOARDIMAGE_COPY'	=> 'الحافظة لديك تحتوي على نص وصورة. أيهما تريد أن تلصقه؟',
	'CLIPBOARDIMAGE_TEXT'	=> 'نص',
	'CLIPBOARDIMAGE_IMAGE'	=> 'صورة',
	'CLIPBOARDIMAGE_BOTH'	=> 'الجميع',
));
