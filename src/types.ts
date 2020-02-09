import { ComponentClass, CSSProperties, ReactElement, StatelessComponent } from 'react'
import atlas, {
  CameraBoundsOptions,
  CameraOptions,
  DataSourceOptions,
  HeatMapLayerOptions,
  HtmlMarker,
  HtmlMarkerEvents,
  HtmlMarkerOptions,
  ImageLayerOptions,
  LineLayerOptions,
  Map,
  MapMouseEvent,
  MapMouseWheelEvent,
  MapTouchEvent,
  Options,
  PolygonExtrusionLayerOptions,
  PolygonLayerOptions,
  PopupEvents,
  PopupOptions,
  ServiceOptions,
  Shape,
  StyleOptions,
  SymbolLayerOptions,
  TargetedEvent,
  TileLayerOptions,
  UserInteractionOptions
} from 'azure-maps-control'

export type IAzureMapOptions = ServiceOptions &
  StyleOptions &
  UserInteractionOptions &
  (CameraOptions | CameraBoundsOptions)

export type IAzureMapChildren =
  | ReactElement<IAzureMapHtmlMarker>
  | ReactElement<IAzureMapPopup>
  | ReactElement<IAzureMapDataSourceProps>

export type IAzureMap = {
  children?: Array<IAzureMapChildren> | IAzureMapChildren
  providedMapId?: string
  containerClassName?: string
  styles?: CSSProperties
  LoaderComponent?: ComponentClass<any> | StatelessComponent<any>
  mapCenter?: Position
  options?: IAzureMapOptions
  imageSprites?: [IAzureMapImageSprite]
  controls?: [IAzureMapControls]
}

export type IAzureMapControls = {
  controlName: string
  controlOptions?: Options
  options?: ControlOptions | undefined
}

export type IAzureMapImageSprite = {
  id: string
  templateName: string
  color?: string
  secondaryColor?: string
  scale?: number
}

export type IAzureMapContextState = {
  mapRef: Map | null
  isMapReady: boolean | false
  setMapRef(mapRef: Map): void
  removeMapRef(): void
  setMapReady(isMapReady: boolean): void
}

export type IAzureMapHtmlMarkerEvent = {
  eventName: keyof HtmlMarkerEvents
  callback: (e: TargetedEvent) => void
}

export type IAzureMapPopupEvent = {
  eventName: keyof PopupEvents
  callback: (e: TargetedEvent) => void
}

export type IAzureMapMouseEvents = {
  [T in keyof HtmlMarkerEvents]: (e: TargetedEvent) => void
}

export type IAzureMapHtmlMarker = {
  id?: string
  isPopupVisible?: boolean
  markerContent: ReactElement
  options?: HtmlMarkerOptions
  events?: Array<IAzureMapHtmlMarkerEvent>
}

export type IAzureMapPopup = {
  isVisible?: boolean
  options?: PopupOptions
  events?: Array<IAzureMapPopupEvent>
  popupContent: ReactElement
}

export type IAzureMapDataSourceContextState = {
  dataSourceRef: atlas.source.DataSource | null
}

export type IAzureMapLayerContextState = {
  layerRef: atlas.layer.SymbolLayer | atlas.layer.ImageLayer | atlas.layer.TileLayer | null
}

export type IAzureDataSourceChildren =
  | ReactElement<IAzureMapFeature>
  | ReactElement<IAzureLayerStatefulProviderProps>

export type IAzureMapDataSourceEvent = {
  [property in IAzureMapDataSourceEventType]: (e: Shape[]) => void
}

export type IAzureDataSourceStatefulProviderProps = {
  id: string
  children?: Array<IAzureDataSourceChildren>
  options?: DataSourceOptions
  events?: IAzureMapDataSourceEvent | any
}

export type IAzureMapLayerEvent = {
  [property in IAzureMapLayerEventType]: (
    e: MapMouseEvent | MapTouchEvent | MapMouseWheelEvent
  ) => void
}

export type IAzureMapLifecycleEvent = {
  [property in IAzureMapLayerLifecycleEvents]: (e: atlas.layer.Layer) => void
}

export type IAzureLayerStatefulProviderProps = {
  id?: string
  options: SymbolLayerOptions &
    HeatMapLayerOptions &
    ImageLayerOptions &
    LineLayerOptions &
    PolygonExtrusionLayerOptions &
    PolygonLayerOptions &
    TileLayerOptions
  type: IAzureMapLayerType
  events?: IAzureMapLayerEvent | any
  lifecycleEvents?: IAzureMapLifecycleEvent | any
}

export type IAzureMapLayerLifecycleEvents = 'layeradded' | 'layerremoved'

export type IAzureMapDataSourceEventType = 'dataadded' | 'dataremoved'

export type IAzureMapLayerEventType =
  // Mouse events
  | 'mousedown'
  | 'mouseup'
  | 'mouseover'
  | 'mousemove'
  | 'click'
  | 'dblclick'
  | 'mouseout'
  | 'mouseenter'
  | 'mouseleave'
  | 'contextmenu'
  // Wheel events
  | 'wheel'
  // Touch events
  | 'touchstart'
  | 'touchend'
  | 'touchmove'
  | 'touchcancel'

export type IAzureMapLayerType =
  | 'SymbolLayer'
  | 'HeatLayer'
  | 'ImageLayer'
  | 'LineLayer'
  | 'PolygonExtrusionLayer'
  | 'PolygonLayer'
  | 'TitleLayer'

export type IAzureMapFeatureType =
  | 'Point'
  | 'MultiPoint'
  | 'LineString'
  | 'MultiLineString'
  | 'Polygon'
  | 'MultiPolygon'

export type IAzureMapFeature = {
  id?: string
  type: IAzureMapFeatureType
  coordinate?: atlas.data.Position
  coordinates?: Array<atlas.data.Position>
  multipleCoordinates?: Array<Array<atlas.data.Position>>
  multipleDimensionCoordinates?: Array<Array<Array<atlas.data.Position>>>
  bbox?: atlas.data.BoundingBox
  properties?: Object //It is required by lib
}

export type IAzureMapLayerProps = IAzureMapLayerContextState
export type IAzureMapMouseEventRef = HtmlMarker // && other possible iterfaces
export type IAzureMapsContextProps = IAzureMapContextState
export type IAzureMapDataSourceProps = IAzureMapDataSourceContextState
export type DataSourceType = atlas.source.DataSource
export type LayerType = atlas.layer.SymbolLayer | atlas.layer.ImageLayer | atlas.layer.TileLayer
export type MapType = atlas.Map
export type GeometryType = atlas.data.Geometry
export type FeatureType = atlas.data.Feature<atlas.data.Geometry, Object>

// Azure types
export type AzureDataLineString = atlas.data.LineString
export type AzureDataPosition = atlas.data.Position
export type ControlOptions = atlas.ControlOptions
