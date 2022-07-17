import React from 'react'
import './InstallMetaMask.scss'

const ModelViewer = require('@metamask/logo');
const InstallMetaMask: React.FC = () => {
  const logoContainer = React.useRef<HTMLDivElement>(null)
  const viewer = ModelViewer({
    pxNotRatio: true,
    width: 400,
    height: 300,
    followMouse: false,
    slowDrift: false,
  });
  React.useEffect(() => {
    logoContainer.current?.appendChild(viewer.container);
    viewer.lookAt({
      x: 100,
      y: 100,
    });
    viewer.setFollowMouse(true);
    viewer.stopAnimation();
  }, [])
  return (
    <div className="InstallMetaMask">
      <h3 className="header">Looks like you don't have MetaMask installed</h3>
      <div ref={logoContainer} id="logo-container"/>
      <a target="_blank" style={{color: 'lightblue'}} href="https://metamask.io/">Visit metamask.io and get it</a>
    </div>
  )
}

export default InstallMetaMask
