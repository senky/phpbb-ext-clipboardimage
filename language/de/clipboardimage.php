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
	'CLIPBOARDIMAGE_COPY'	=> 'Deine Zwischenablage enthält sowohl ein Bild als auch Text. Was davon willst Du einfügen?',
	'CLIPBOARDIMAGE_TEXT'	=> 'Text',
	'CLIPBOARDIMAGE_IMAGE'	=> 'Bild',
	'CLIPBOARDIMAGE_BOTH'	=> 'Beide',
));
