exports.colors = {
  white: "#ffffff",
  black: "#000000",
  primary: {
    50: "var(--primary-50)",
    75: "var(--primary-75)",
    100: "var(--primary-100)",
    200: "var(--primary-200)",
    300: "var(--primary-300)",
    400: "var(--primary-400)",
    500: "var(--primary-500)", //*
    600: "var(--primary-600)",
    700: "var(--primary-700)",
    800: "var(--primary-800)",
    900: "var(--primary-900)",
  },
  //gray/black
  black: {
    900: "#222222",
    800: "#3B3B3B", //*
    700: "#535353",
    600: "#6C6C6C",
    500: "#848484",
    400: "#9D9D9D",
    300: "#B5B5B5",
    200: "#CECECE",
    100: "#E6E6E6",
    50: "#F7F7F7",
  },
  secondary: {
    50: "var(--secondary-50)",
    75: "var(--secondary-75)",
    100: "var(--secondary-100)",
    200: "var(--secondary-200)",
    300: "var(--secondary-300)",
    400: "var(--secondary-400)",
    500: "var(--secondary-500)", //*
    600: "var(--secondary-600)",
    700: "var(--secondary-700)",
    800: "var(--secondary-800)",
    900: "var(--secondary-900)",
  },
  tertiary: {
    900: "#0f2644",
    800: "#183661",
    700: "#2d456a",
    600: "#415472",
    500: "#506178", //*
    400: "#5f7187",
    300: "#8791a0",
    200: "#aeb4be",
    100: "#c5ccd4",
    50: "#ffffff",
  },
  red: {
    500: "#CA003D",
  },
};

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
		pn: {
			family: [ 'proxima-nova', 'sans-serif'],
			offset: { cap: 0.16, midCap: 0.19, baseline: 0.17 }
		},
		ns: {
			family: [ 'new-spirit', 'sans-serif'],
			offset: { cap: 0.14, midCap: 0.17, baseline: 0.16 }
		}
	},

	styles: {
		'sh': {
			fontFamily: 'pn',
			fontWeight: 'medium',
			fontSize: { base: '16', md: '18' },
			lineHeight: { base: '120' },
			letterSpacing: '15',
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
			fontFamily: 'ns',
			fontWeight: 'normal',
			fontSize: { base: '54', md: '94' },
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
			fontFamily: 'ns',
			fontWeight: 'normal',
			fontSize: { base: '40', md: '50' },
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
			fontFamily: 'ns',
			fontWeight: 'light',
			fontSize: { base: '30', md: '38' },
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
			fontFamily: 'ns',
			fontWeight: 'light',
			fontSize: { base: '25', md: '32' },
			lineHeight: { base: '120' },
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
			fontFamily: 'pn',
			fontWeight: 'light',
			fontSize: { base: '22', md: '28' },
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
			fontFamily: 'pn',
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
			fontFamily: 'pn',
			fontWeight: 'normal',
			fontSize: { base: '20', md: '22' },
			lineHeight: { base: '140', md:'150' },
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
			fontFamily: 'pn',
			fontWeight: 'normal',
			fontSize: { base: '16', md: '18' },
			lineHeight: { base: '140', md: '150' },
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
			fontFamily: 'pn',
			fontWeight: 'normal',
			fontSize: { base: '14', md: '16' },
			lineHeight: { base: '140', md:'150' },
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
			fontFamily: 'pn',
			fontWeight: 'normal',
			fontSize: { base: '13', md: '14' },
			lineHeight: { base: '140', md: '150' },
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
			fontFamily: 'pn',
			fontWeight: 'normal',
			fontSize: { base: '17', md: '20' },
			lineHeight: { base: '140' },
		},
		'list-2': {
			fontFamily: 'pn',
			fontWeight: 'normal',
			fontSize: { base: '17', md: '20' },
			lineHeight: { base: '140' },
		},
		'blockquote': {
			fontFamily: 'pn',
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
