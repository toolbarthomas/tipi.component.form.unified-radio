function setUnifiedRadio() {
	var unifiedRadioElements = {
		root 		: 'radio',
		container	: 'radio-group',
		label		: 'label',
		input		: 'input[type="radio"]',
		form		: 'form',
	};

	var unifiedRadioStates = {
		ready 		: '__radio--ready',
		focus 		: '__radio--focus',
		checked 	: '__radio--checked',
		disabled 	: '__radio--disabled',
		placeholder : '__radio--placeholder'
	};

	var unifiedRadio = $('.' + unifiedRadioElements.root).not('.' + unifiedRadioStates.ready);
	if(unifiedRadio.length > 0) {
		unifiedRadio.each(function() {
			var unifiedRadioEach = $(this);
			var unifiedRadioLabel = getUnifiedRadioElement(unifiedRadioEach, 'label', unifiedRadioElements);
			var unifiedRadioInput = getUnifiedRadioElement(unifiedRadioEach, 'input', unifiedRadioElements);
			var unifiedRadioForm = getUnifiedRadioElement(unifiedRadioEach, 'form', unifiedRadioElements);

			if(unifiedRadioLabel.length > 0 && unifiedRadioInput.length > 0) {

				//Set the disabled state on the .radio container.
				if(unifiedRadioInput.prop('disabled') === true) {
					unifiedRadioEach.addClass(unifiedRadioStates.disabled);
				} else {
					unifiedRadioEach.removeClass(unifiedRadioStates.disabled);
				}

				if(typeof unifiedRadioForm != 'undefined') {
					unifiedRadioForm.on({
						reset : function() {
							unifiedRadioInput.not('[disabled]').prop('checked', false).trigger('change');
						}
					});
				}

				unifiedRadioInput.on({
					click : function(event) {
						event.stopImmediatePropagation();
					},
					focus : function(event) {
						var unifiedRadio = getUnifiedRadioElement($(this), 'root', unifiedRadioElements);
						unifiedRadioEach.addClass(unifiedRadioStates.focus);
					},
					blur : function(event) {
						var unifiedRadio = getUnifiedRadioElement($(this), 'root', unifiedRadioElements);
						unifiedRadioEach.removeClass(unifiedRadioStates.focus);
					},
					change : function(event) {
						var unifiedRadio = getUnifiedRadioElement($(this), 'root', unifiedRadioElements);
						unifiedRadioEach.trigger('tipi.ui.unified.radio.change', [$(this)]);
					}
				});

				unifiedRadioEach.on({
					click : function(event) {
						event.preventDefault();
						event.stopPropagation();

						var unifiedRadioInput = getUnifiedRadioElement($(this), 'input', unifiedRadioElements);

						if(unifiedRadioInput.prop('disabled') === false) {
							unifiedRadioInput.prop('checked', true);
							unifiedRadioInput.trigger('change');
						}
					},
					'tipi.ui.unified.radio.change' : function(event, input) {
						changeUnifiedRadio(input, unifiedRadioElements, unifiedRadioStates);
					}
				});

				unifiedRadioEach.addClass(unifiedRadioStates.ready);
				setUnifiedRadioAttributes(unifiedRadioEach, unifiedRadioInput, unifiedRadioStates);
			}
		});
	}
}

function setUnifiedRadioAttributes(unifiedRadio, unifiedRadioInput, unifiedRadioStates) {
	if(unifiedRadioInput.prop('checked') === true) {
		unifiedRadio.addClass(unifiedRadioStates.checked);
	}
}

function changeUnifiedRadio(unifiedRadioInput, unifiedRadioElements, unifiedRadioStates, firstRun) {
	var unifiedRadio = getUnifiedRadioElement(unifiedRadioInput, 'root', unifiedRadioElements);
	var unifiedRadios = getUnifiedRadioElement(unifiedRadioInput, 'roots', unifiedRadioElements);

	unifiedRadios.removeClass(unifiedRadioStates.checked);

	if(unifiedRadioInput.prop('checked') === true) {
		unifiedRadio.addClass(unifiedRadioStates.checked);
	} else {
		unifiedRadio.removeClass(unifiedRadioStates.checked);
	}
}

function getUnifiedRadioElement(origin, unifiedRadioType, unifiedRadioElements) {
	if(typeof origin != 'undefined' && typeof unifiedRadioType != 'undefined') {
		var element;

		switch(unifiedRadioType) {
			case 'container':
				element = origin.parents('.' + unifiedRadioElements.container).first();
			break;
			case 'root':
				element = origin.parents('.' + unifiedRadioElements.root).first();
			break;
			case 'roots':
				element = origin.parents('.' + unifiedRadioElements.container).first().find('.' + unifiedRadioElements.root);
			break;
			case 'label':
				element = origin.find(unifiedRadioElements.label).first();
			break;
			case 'input':
				element = origin.find(unifiedRadioElements.input).first();
			break;
			case 'form':
				element = origin.parents(unifiedRadioElements.form).first();
			break;
			default:
				element = undefined;
		}

		return element;
	}
}