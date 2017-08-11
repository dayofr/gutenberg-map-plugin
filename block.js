var el = wp.element.createElement,
  registerBlockType = wp.blocks.registerBlockType,
  InspectorControls = wp.blocks.InspectorControls,
  TextControl = wp.blocks.InspectorControls.TextControl,
  SelectControl = wp.blocks.InspectorControls.SelectControl,
  RangeControl = wp.blocks.InspectorControls.RangeControl,
  google_api_key = 'YOUR_GOOGLE_API_KEY_HERE';

const linkOptions = [
  {value: 'roadmap', label: 'roadmap'},
  {value: 'satellite', label: 'satellite'},
  {value: 'hybrid', label: 'hybrid'},
  {value: 'terrain', label: 'terrain'},
];

registerBlockType('dayo/gutenberg-map', {
  title: 'Google Map Static',

  icon: 'location',

  category: 'common',

  attributes: {
    location: {type: 'string', default: 'Brooklyn+Bridge,New+York,NY'},
    mapType: {type: 'string', default: 'roadmap'},
    zoom: {type: 'int', default: 13}
  },

  edit: function (props) {
    var location = props.attributes.location || 'Brooklyn+Bridge,New+York,NY',
      mapType = props.attributes.mapType || 'roadmap',
      zoom = props.attributes.zoom || 13,
      focus = props.focus;

    function onBlurType(mapType) {
      props.setAttributes({mapType: mapType});
    }

    function onChangeZoom(zoom) {
      props.setAttributes({zoom: zoom});
    }

    function onChangeLocation(loc) {
      props.setAttributes({location: loc});
    }

    return [
      el('img', {
        className: props.className,
        src: 'https://maps.googleapis.com/maps/api/staticmap?center=' + location + '&zoom=' + zoom + '&size=600x300&maptype=' + mapType + '&key=' + google_api_key
      }),
      !!focus && el(
        InspectorControls,
        {key: 'inspector'},
        el('h3', null, 'Map Settings'),
        el(
          SelectControl,
          {
            label: 'Map Type',
            select: mapType,
            onBlur: onBlurType,
            options: linkOptions
          }
        ),
        el(
          TextControl,
          {
            label: 'Location Name',
            value: location,
            onChange: onChangeLocation
          }
        ),
        el(
          RangeControl,
          {
            label: 'Zoom Level',
            value: zoom,
            onChange: onChangeZoom,
            min: 1,
            max: 20
          }
        )
      )
      ,
    ];
  },

  save: function (props) {
    var location = props.attributes.location,
      mapType = props.attributes.mapType,
      zoom = props.attributes.zoom;

    return el('img', {
      className: props.className,
      src: 'https://maps.googleapis.com/maps/api/staticmap?center=' + location + '&zoom=' + zoom + '&size=600x300&maptype=' + mapType + '&key=' + google_api_key
    });
  },
});
