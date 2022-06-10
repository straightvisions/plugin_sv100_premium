const attributes = {
	borderActive                    :{ type: 'boolean', default: false },
	borderMoreActive                :{ type: 'boolean', default: false },
	
	// border width
	borderWidthTopMobile                 :{ type: 'string', default: ''},
	borderWidthTopMobileLandscape        :{ type: 'string', default: ''},
	borderWidthTopTablet                 :{ type: 'string', default: ''},
	borderWidthTopTabletLandscape        :{ type: 'string', default: ''},
	borderWidthTopTabletPro              :{ type: 'string', default: ''},
	borderWidthTopTabletProLandscape     :{ type: 'string', default: ''},
	borderWidthTopDesktop                :{ type: 'string', default: ''},
	
	borderWidthRightMobile                 :{ type: 'string', default: ''},
	borderWidthRightMobileLandscape        :{ type: 'string', default: ''},
	borderWidthRightTablet                 :{ type: 'string', default: ''},
	borderWidthRightTabletLandscape        :{ type: 'string', default: ''},
	borderWidthRightTabletPro              :{ type: 'string', default: ''},
	borderWidthRightTabletProLandscape     :{ type: 'string', default: ''},
	borderWidthRightDesktop                :{ type: 'string', default: ''},
	
	borderWidthBottomMobile                 :{ type: 'string', default: ''},
	borderWidthBottomMobileLandscape        :{ type: 'string', default: ''},
	borderWidthBottomTablet                 :{ type: 'string', default: ''},
	borderWidthBottomTabletLandscape        :{ type: 'string', default: ''},
	borderWidthBottomTabletPro              :{ type: 'string', default: ''},
	borderWidthBottomTabletProLandscape     :{ type: 'string', default: ''},
	borderWidthBottomDesktop                :{ type: 'string', default: ''},
	
	borderWidthLeftMobile                 :{ type: 'string', default: ''},
	borderWidthLeftMobileLandscape        :{ type: 'string', default: ''},
	borderWidthLeftTablet                 :{ type: 'string', default: ''},
	borderWidthLeftTabletLandscape        :{ type: 'string', default: ''},
	borderWidthLeftTabletPro              :{ type: 'string', default: ''},
	borderWidthLeftTabletProLandscape     :{ type: 'string', default: ''},
	borderWidthLeftDesktop                :{ type: 'string', default: ''},
	
	// color
	borderColorTopMobile                 :{ type: 'string', default: '#00000'},
	borderColorTopMobileLandscape        :{ type: 'string', default: '#00000'},
	borderColorTopTablet                 :{ type: 'string', default: '#00000'},
	borderColorTopTabletLandscape        :{ type: 'string', default: '#00000'},
	borderColorTopTabletPro              :{ type: 'string', default: '#00000'},
	borderColorTopTabletProLandscape     :{ type: 'string', default: '#00000'},
	borderColorTopDesktop                :{ type: 'string', default: '#00000'},
	
	borderColorRightMobile                 :{ type: 'string', default: '#00000'},
	borderColorRightMobileLandscape        :{ type: 'string', default: '#00000'},
	borderColorRightTablet                 :{ type: 'string', default: '#00000'},
	borderColorRightTabletLandscape        :{ type: 'string', default: '#00000'},
	borderColorRightTabletPro              :{ type: 'string', default: '#00000'},
	borderColorRightTabletProLandscape     :{ type: 'string', default: '#00000'},
	borderColorRightDesktop                :{ type: 'string', default: '#00000'},
	
	borderColorBottomMobile                 :{ type: 'string', default: '#00000'},
	borderColorBottomMobileLandscape        :{ type: 'string', default: '#00000'},
	borderColorBottomTablet                 :{ type: 'string', default: '#00000'},
	borderColorBottomTabletLandscape        :{ type: 'string', default: '#00000'},
	borderColorBottomTabletPro              :{ type: 'string', default: '#00000'},
	borderColorBottomTabletProLandscape     :{ type: 'string', default: '#00000'},
	borderColorBottomDesktop                :{ type: 'string', default: '#00000'},
	
	borderColorLeftMobile                 :{ type: 'string', default: '#00000'},
	borderColorLeftMobileLandscape        :{ type: 'string', default: '#00000'},
	borderColorLeftTablet                 :{ type: 'string', default: '#00000'},
	borderColorLeftTabletLandscape        :{ type: 'string', default: '#00000'},
	borderColorLeftTabletPro              :{ type: 'string', default: '#00000'},
	borderColorLeftTabletProLandscape     :{ type: 'string', default: '#00000'},
	borderColorLeftDesktop                :{ type: 'string', default: '#00000'},
	
	// style
	borderStyleTopMobile                 :{ type: 'string', default: 'solid'},
	borderStyleTopMobileLandscape        :{ type: 'string', default: 'solid'},
	borderStyleTopTablet                 :{ type: 'string', default: 'solid'},
	borderStyleTopTabletLandscape        :{ type: 'string', default: 'solid'},
	borderStyleTopTabletPro              :{ type: 'string', default: 'solid'},
	borderStyleTopTabletProLandscape     :{ type: 'string', default: 'solid'},
	borderStyleTopDesktop                :{ type: 'string', default: 'solid'},
	
	borderStyleRightMobile                 :{ type: 'string', default: 'solid'},
	borderStyleRightMobileLandscape        :{ type: 'string', default: 'solid'},
	borderStyleRightTablet                 :{ type: 'string', default: 'solid'},
	borderStyleRightTabletLandscape        :{ type: 'string', default: 'solid'},
	borderStyleRightTabletPro              :{ type: 'string', default: 'solid'},
	borderStyleRightTabletProLandscape     :{ type: 'string', default: 'solid'},
	borderStyleRightDesktop                :{ type: 'string', default: 'solid'},
	
	borderStyleBottomMobile                 :{ type: 'string', default: 'solid'},
	borderStyleBottomMobileLandscape        :{ type: 'string', default: 'solid'},
	borderStyleBottomTablet                 :{ type: 'string', default: 'solid'},
	borderStyleBottomTabletLandscape        :{ type: 'string', default: 'solid'},
	borderStyleBottomTabletPro              :{ type: 'string', default: 'solid'},
	borderStyleBottomTabletProLandscape     :{ type: 'string', default: 'solid'},
	borderStyleBottomDesktop                :{ type: 'string', default: 'solid'},
	
	borderStyleLeftMobile                 :{ type: 'string', default: 'solid'},
	borderStyleLeftMobileLandscape        :{ type: 'string', default: 'solid'},
	borderStyleLeftTablet                 :{ type: 'string', default: 'solid'},
	borderStyleLeftTabletLandscape        :{ type: 'string', default: 'solid'},
	borderStyleLeftTabletPro              :{ type: 'string', default: 'solid'},
	borderStyleLeftTabletProLandscape     :{ type: 'string', default: 'solid'},
	borderStyleLeftDesktop                :{ type: 'string', default: 'solid'},
	
	// utils
	_borderColorPopover                :{ type: 'boolean', default: false },
	_borderColorPopoverCallback        :{ type: 'object', default: {} },
};

export default attributes;