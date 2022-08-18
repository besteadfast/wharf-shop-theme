exports.colors = {
	white: '#ffffff',
	black: '#000000',
	primary: {
		50: 'var(--primary-50)',
		75: 'var(--primary-75)',
		100: 'var(--primary-100)',
		200: 'var(--primary-200)',
		300: 'var(--primary-300)',
		400: 'var(--primary-400)',
		500: 'var(--primary-500)', //*
		600: 'var(--primary-600)',
		700: 'var(--primary-700)',
		800: 'var(--primary-800)',
		900: 'var(--primary-900)',
	},
	//gray/black
	black: {
        900: "#1a1a1a",
		800: "#333333", //*
		700: "#4d4d4d",
		600: "#666666",
		500: "#808080",
		400: "#999999",
		300: "#b3b3b3",
		200: "#cccccc",
		100: "#e6e6e6",
		50: "#f2f2f2"
    },
	secondary: {
		"900": "#a5762b",
		"800": "#b4802a",
		"700": "#c38c29",
		"600": "#d29a27",
		"500": "#e5a824", //*
		"400": "#e9b446",
		"300": "#ecc169",
		"200": "#efce87",
		"100": "#f3dba6",
		"50": "#f6e9c7"
	},
	tertiary: {
		"900": "#0f2644",
		"800": "#183661",
		"700": "#2d456a",
		"600": "#415472",
		"500": "#506178", //*
		"400": "#5f7187",
		"300": "#8791a0",
		"200": "#aeb4be",
		"100": "#c5ccd4",
		"50": "#ffffff"
	}
}

exports.icons = {
	12: { abbr: '12', size: '12px', folder: '12' },
	20: { abbr: '20', size: '20px', folder: '20' },
	24: { abbr: '24', size: '24px', folder: '24' },
	32: { abbr: '32', size: '32px', folder: '32' },
	64: { abbr: '64', size: '64px', folder: '64' },
}

exports.shadows = {
	none: 'none',
	nav: '0px 0px 10px rgba(0, 0, 0, 0.15)',
}


exports.typography = {
	fonts: {
		atkinson: {
			family: [ 'Atkinson Hyperlegible', 'sans-serif'],
			offset: { cap: 0.16, midCap: 0.19, baseline: 0.17 }
		},
		dm: {
			family: [ 'DM Sans', 'sans-serif'],
			offset: { cap: 0.14, midCap: 0.17, baseline: 0.16 }
		}
	},

	styles: {
		'sh': {
			fontFamily: 'dm',
			fontWeight: 'medium',
			fontSize: { base: '18', md: '20' },
			lineHeight: { base: '120' },
			letterSpacing: '20',
			uppercase: true,
			spacing: {
				'sh':         { base: 's5', md: 's5' },
				'h1':         { base: 's9', md: 's11' },
				'h2':         { base: 's7', md: 's7' },
				'h3':         { base: 's7', md: 's7' },
				'h4':         { base: 's7', md: 's8' },
				'h5':         { base: 's7', md: 's8' },
				'h6':         { base: 's7', md: 's8' },
				'p-lg':       { base: 's10', md: 's12' },
				'p':          { base: 's10', md: 's12' },
				'p-sm':       { base: 's10', md: 's12' },
				'p-xs':       { base: 's10', md: 's12' },
				'list':       { base: 's10', md: 's12' },
				'blockquote': { base: 's10', md: 's12' },
			}
		},
		'h1': {
			fontFamily: 'dm',
			fontWeight: 'bold',
			fontSize: { base: '44', md: '72' },
			lineHeight: { base: '120' },
			uppercase: false,
			spacing: {
				'sh':         { base: 's7',  md: 's8' },
				'h1':         { base: 's10', md: 's10' },
				'h2':         { base: 's10', md: 's12' },
				'h3':         { base: 's10', md: 's12' },
				'h4':         { base: 's10', md: 's9' },
				'h5':         { base: 's10', md: 's9' },
				'h6':         { base: 's10', md: 's9' },
				'p-lg':       { base: 's10', md: 's12' },
				'p':          { base: 's10', md: 's12' },
				'p-sm':       { base: 's10', md: 's12' },
				'p-xs':       { base: 's10', md: 's12' },
				'list':       { base: 's10', md: 's12' },
				'blockquote': { base: 's10', md: 's12' },
			}
		},
		'h2': {
			fontFamily: 'dm',
			fontWeight: 'bold',
			fontSize: { base: '28', md: '36' },
			lineHeight: { base: '120' },
			spacing: {
				'sh':         { base: 's7',  md: 's7' },
				'h1':         { base: 's9', md: 's11' },
				'h2':         { base: 's7', md: 's10' },
				'h3':         { base: 's9', md: 's10' },
				'h4':         { base: 's8', md: 's8' },
				'h5':         { base: 's8', md: 's8' },
				'h6':         { base: 's8', md: 's8' },
				'p-lg':       { base: 's10', md: 's12' },
				'p':          { base: 's10', md: 's12' },
				'p-sm':       { base: 's10', md: 's12' },
				'p-xs':       { base: 's10', md: 's12' },
				'list':       { base: 's10', md: 's12' },
				'blockquote': { base: 's10', md: 's12' },
			}
		},
		'h3': {
			fontFamily: 'dm',
			fontWeight: 'bold',
			fontSize: { base: '22', md: '28' },
			lineHeight: { base: '120' },
			spacing: {
				'sh':         { base: 's7',  md: 's7' },
				'h1':         { base: 's9', md: 's11' },
				'h2':         { base: 's7', md: 's10' },
				'h3':         { base: 's8', md: 's10' },
				'h4':         { base: 's8', md: 's8' },
				'h5':         { base: 's8', md: 's8' },
				'h6':         { base: 's8', md: 's8' },
				'p-lg':       { base: 's10', md: 's12' },
				'p':          { base: 's10', md: 's12' },
				'p-sm':       { base: 's10', md: 's12' },
				'p-xs':       { base: 's10', md: 's12' },
				'list':       { base: 's10', md: 's12' },
				'blockquote': { base: 's10', md: 's12' },
			}
		},
		'h4': {
			fontFamily: 'dm',
			fontWeight: 'medium',
			fontSize: { base: '15', md: '20' },
			lineHeight: { base: '120' },
			letterSpacing: '20',
			uppercase: true,
			spacing: {
				'sh':         { base: 's8', md: 's8' },
				'h1':         { base: 's9', md: 's11' },
				'h2':         { base: 's7', md: 's10' },
				'h3':         { base: 's8', md: 's10' },
				'h4':         { base: 's8', md: 's8' },
				'h5':         { base: 's8', md: 's8' },
				'h6':         { base: 's8', md: 's8' },
				'p-lg':       { base: 's10', md: 's12' },
				'p':          { base: 's10', md: 's12' },
				'p-sm':       { base: 's10', md: 's12' },
				'p-xs':       { base: 's10', md: 's12' },
				'list':       { base: 's10', md: 's12' },
				'blockquote': { base: 's10', md: 's12' },
			}
		},
		'h5': {
			fontFamily: 'dm',
			fontWeight: 'medium',
			fontSize: { base: '18', md: '22' },
			lineHeight: { base: '120' },
			uppercase: false,
			spacing: {
				'sh':         { base: 's8', md: 's8' },
				'h1':         { base: 's9', md: 's11' },
				'h2':         { base: 's7', md: 's10' },
				'h3':         { base: 's8', md: 's10' },
				'h4':         { base: 's8', md: 's8' },
				'h5':         { base: 's8', md: 's8' },
				'h6':         { base: 's8', md: 's8' },
				'p-lg':       { base: 's10', md: 's12' },
				'p':          { base: 's10', md: 's12' },
				'p-sm':       { base: 's10', md: 's12' },
				'p-xs':       { base: 's10', md: 's12' },
				'list':       { base: 's10', md: 's12' },
				'blockquote': { base: 's10', md: 's12' },
			}
		},
		'h6': {
			fontFamily: 'dm',
			fontWeight: 'medium',
			fontSize: { base: '12', md: '14' },
			lineHeight: { base: '120' },
			letterSpacing: '20',
			uppercase: true,
			spacing: {
				'sh':         { base: 's8', md: 's8' },
				'h1':         { base: 's9', md: 's11' },
				'h2':         { base: 's7', md: 's10' },
				'h3':         { base: 's8', md: 's10' },
				'h4':         { base: 's8', md: 's8' },
				'h5':         { base: 's8', md: 's8' },
				'h6':         { base: 's8', md: 's8' },
				'p-lg':       { base: 's10', md: 's12' },
				'p':          { base: 's10', md: 's12' },
				'p-sm':       { base: 's10', md: 's12' },
				'p-xs':       { base: 's10', md: 's12' },
				'list':       { base: 's10', md: 's12' },
				'blockquote': { base: 's10', md: 's12' },
			}
		},
		'p-lg': {
			fontFamily: 'atkinson',
			fontWeight: 'normal',
			fontSize: { base: '18', md: '28' },
			lineHeight: { base: '140' },
			spacing: {
				'sh':         { base: 's6', md: 's7' },
				'h1':         { base: 's9', md: 's9' },
				'h2':         { base: 's8', md: 's9' },
				'h3':         { base: 's8',  md: 's9' },
				'h4':         { base: 's7',  md: 's8' },
				'h5':         { base: 's7',  md: 's8' },
				'h6':         { base: 's7',  md: 's8' },
				'p-lg':       { base: 's8',  md: 's9' },
				'p':          { base: 's8',  md: 's9' },
				'p-sm':       { base: 's8',  md: 's9' },
				'p-xs':       { base: 's8',  md: 's9' },
				'list':       { base: 's8',  md: 's9' },
				'blockquote': { base: 's8',  md: 's9' },
			}
		},
		'p': {
			fontFamily: 'atkinson',
			fontWeight: 'normal',
			fontSize: { base: '16', md: '20' },
			lineHeight: { base: '140' },
			spacing: {
				'sh':         { base: 's6', md: 's7' },
				'h1':         { base: 's9', md: 's9' },
				'h2':         { base: 's8', md: 's9' },
				'h3':         { base: 's8',  md: 's9' },
				'h4':         { base: 's7',  md: 's8' },
				'h5':         { base: 's7',  md: 's8' },
				'h6':         { base: 's7',  md: 's8' },
				'p-lg':       { base: 's8',  md: 's9' },
				'p':          { base: 's8',  md: 's9' },
				'p-sm':       { base: 's8',  md: 's9' },
				'p-xs':       { base: 's8',  md: 's9' },
				'list':       { base: 's8',  md: 's9' },
				'blockquote': { base: 's8',  md: 's9' },
			}
		},
		'p-sm': {
			fontFamily: 'atkinson',
			fontWeight: 'normal',
			fontSize: { base: '15', md: '18' },
			lineHeight: { base: '140' },
			spacing: {
				'sh':         { base: 's6', md: 's7' },
				'h1':         { base: 's8', md: 's9' },
				'h2':         { base: 's8', md: 's9' },
				'h3':         { base: 's8',  md: 's9' },
				'h4':         { base: 's7',  md: 's8' },
				'h5':         { base: 's7',  md: 's8' },
				'h6':         { base: 's7',  md: 's8' },
				'p-lg':       { base: 's8',  md: 's9' },
				'p':          { base: 's7',  md: 's8' },
				'p-sm':       { base: 's7',  md: 's8' },
				'p-xs':       { base: 's6',  md: 's7' },
				'list':       { base: 's8',  md: 's9' },
				'blockquote': { base: 's8',  md: 's9' },
			}
		},
		'p-xs': {
			fontFamily: 'atkinson',
			fontWeight: 'normal',
			fontSize: { base: '14', md: '16' },
			lineHeight: { base: '120', md: '140' },
			spacing: {
				'sh':         { base: 's6', md: 's7' },
				'h1':         { base: 's8', md: 's9' },
				'h2':         { base: 's8', md: 's9' },
				'h3':         { base: 's8',  md: 's9' },
				'h4':         { base: 's7',  md: 's8' },
				'h5':         { base: 's7',  md: 's8' },
				'h6':         { base: 's7',  md: 's8' },
				'p-lg':       { base: 's8',  md: 's9' },
				'p':          { base: 's7',  md: 's8' },
				'p-sm':       { base: 's7',  md: 's8' },
				'p-xs':       { base: 's6',  md: 's7' },
				'list':       { base: 's8',  md: 's9' },
				'blockquote': { base: 's8',  md: 's9' },
			}
		},
		'list': {
			spacing: {
				'sh':         { base: 's4', md: 's5' },
				'h1':         { base: 's9', md: 's9' },
				'h2':         { base: 's8',  md: 's9' },
				'h3':         { base: 's8',  md: 's9' },
				'h4':         { base: 's7',  md: 's8' },
				'h5':         { base: 's7',  md: 's8' },
				'h6':         { base: 's7',  md: 's8' },
				'p-lg':       { base: 's7',  md: 's9' },
				'p':          { base: 's6',  md: 's8' },
				'p-sm':       { base: 's6',  md: 's8' },
				'p-xs':       { base: 's6',  md: 's8' },
				'list':       { base: 's6',  md: 's8' },
				'blockquote': { base: 's8',  md: 's9' },
			}
		},
		'list-1': {
			fontFamily: 'atkinson',
			fontWeight: 'normal',
			fontSize: { base: '17', md: '20' },
			lineHeight: { base: '140' },
		},
		'list-2': {
			fontFamily: 'atkinson',
			fontWeight: 'normal',
			fontSize: { base: '17', md: '20' },
			lineHeight: { base: '140' },
		},
		'blockquote': {
			fontFamily: 'atkinson',
			fontWeight: 'normal',
			fontSize: { base: '17', md: '20' },
			lineHeight: { base: '140' },
			spacing: {
				'sh':         { base: 's4', md: 's5' },
				'h1':         { base: 's9', md: 's9' },
				'h2':         { base: 's8',  md: 's9' },
				'h3':         { base: 's8',  md: 's9' },
				'h4':         { base: 's7',  md: 's8' },
				'h5':         { base: 's7',  md: 's8' },
				'h6':         { base: 's7',  md: 's8' },
				'p-lg':       { base: 's7',  md: 's9' },
				'p':          { base: 's7',  md: 's8' },
				'p-sm':       { base: 's7',  md: 's8' },
				'p-xs':       { base: 's7',  md: 's8' },
				'list':       { base: 's7',  md: 's8' },
				'blockquote': { base: 's7',  md: 's9' },
			}
		},
	}
}