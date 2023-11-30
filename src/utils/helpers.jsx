export const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }).join('')
  
//   console.log(rgbToHex(0, 51, 255)); 
  // '#0033ff'