/* eslint-disable antfu/no-import-node-modules-by-path */
import Leaflet from 'leaflet';
import markerIconRetinaUrl from '~/../node_modules/leaflet/dist/images/marker-icon-2x.png';
import markerIconUrl from '~/../node_modules/leaflet/dist/images/marker-icon.png';
import markerShadowUrl from '~/../node_modules/leaflet/dist/images/marker-shadow.png';

Leaflet.Icon.Default.prototype.options.iconUrl = markerIconUrl;
Leaflet.Icon.Default.prototype.options.iconRetinaUrl = markerIconRetinaUrl;
Leaflet.Icon.Default.prototype.options.shadowUrl = markerShadowUrl;
Leaflet.Icon.Default.imagePath = '';
