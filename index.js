import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NativeModules, requireNativeComponent } from 'react-native'

const { ALPRCameraManager } = NativeModules

const ALPRCamera = requireNativeComponent('ALPRCamera', Camera, {
  nativeOnly: {
    rotateMode: true,
    mounted: true,
  },
})

class Camera extends Component {
  onPlateRecognized = ({ nativeEvent }) =>
    this.props.onPlateRecognized(nativeEvent)

  capture = (options) => {
    const props = convertNativeProps(this.props);
    options = {
      playSoundOnCapture: props.playSoundOnCapture,
      target: props.captureTarget,
      captureQuality: props.captureQuality,
      type: 2,
      ...options
    };

    return ALPRCameraManager.capture(options);
  }

  render() {
    console.log('Fork camera running 3...');
    return (
      <ALPRCamera {...this.props} onPlateRecognized={this.onPlateRecognized} />
    )
  }
}

Camera.propTypes = {
  aspect: PropTypes.number,
  captureTarget: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  captureQuality: PropTypes.number,
  country: PropTypes.string,
  onPlateRecognized: PropTypes.func,
  plateOutlineColor: PropTypes.string,
  showPlateOutline: PropTypes.bool,
  torchMode: PropTypes.PropTypes.number,
  zoom: PropTypes.PropTypes.number,
  touchToFocus: PropTypes.bool,
  type: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  playSoundOnCapture: PropTypes.bool,
}

Camera.defaultProps = {
  aspect: ALPRCameraManager.Aspect.fill,
  captureTarget: ALPRCameraManager.CaptureTarget.cameraRoll,
  captureQuality: ALPRCameraManager.CaptureQuality.medium,
  country: 'us',
  plateOutlineColor: '#0028ff',
  showPlateOutline: true,
  zoom: 0,
  torchMode: ALPRCameraManager.TorchMode.off,
  touchToFocus: true,
  onPlateRecognized: () => {},
  type: ALPRCameraManager.Type.back,
  playSoundOnCapture: true,

}

export default Camera

export const Aspect = ALPRCameraManager.Aspect
export const CaptureQuality = ALPRCameraManager.CaptureQuality
export const TorchMode = ALPRCameraManager.TorchMode
export const RotateMode = ALPRCameraManager.RotateMode

// Take a picture of what is currently seen by the user.
// Possible options: width (int), height (int) and quality (float).
// @return a Promise<String:uri>.
// @warn Currently only works on iOS.
export const takePicture = ALPRCameraManager.takePicture
