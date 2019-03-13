<?php
/**
 *
 * Clipboard Image. An extension for the phpBB Forum Software package.
 *
 * @copyright (c) 2019 Jakub Senko
 * @license GNU General Public License, version 2 (GPL-2.0)
 *
 */

namespace senky\clipboardimage\event;

/**
 * @ignore
 */
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class listener implements EventSubscriberInterface
{
	/** @var \phpbb\language\language */
	protected $language;

	/**
	 * {@inheritdoc}
	 */
	public static function getSubscribedEvents()
	{
		return array(
			'core.posting_modify_template_vars'	=> 'load_language',
			'core.ucp_pm_compose_modify_data'	=> 'load_language',
		);
	}

	/**
	 * Constructor
	 *
	 * @param \phpbb\language\language	$language	Language object
	 */
	public function __construct(\phpbb\language\language $language)
	{
		$this->language = $language;
	}

	/**
	 * Load Clipboard Image language file
	 *
	 * @return	void
	 */
	public function load_language()
	{
		$this->language->add_lang('clipboardimage', 'senky/clipboardimage');
	}
}
