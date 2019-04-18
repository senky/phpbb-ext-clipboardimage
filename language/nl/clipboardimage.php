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
	'CLIPBOARDIMAGE_COPY'	=> 'Uw klembord bevat zowel tekst als afbeelding. Welk item wil je plakken?',
	'CLIPBOARDIMAGE_TEXT'	=> 'Tekst',
	'CLIPBOARDIMAGE_IMAGE'	=> 'Afbeelding',
	'CLIPBOARDIMAGE_BOTH'	=> 'Beide',
));
