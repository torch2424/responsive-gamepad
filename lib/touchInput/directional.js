export function getDirectionalTouch(event, boundingClientRect) {
  // We will need these  calculations for when if we are dpad or analog

  // Calculate for the correct key
  // Only using the first touch, since we shouldn't be having two fingers on the dpad
  let touch;
  if (event.type.includes('touch')) {
    touch = event.touches[0];
  } else if (event.type.includes('mouse')) {
    touch = event;
  }

  // We will need these  calculations for when if we are dpad or analog
  // Find our centers of our rectangles, and our unbiased X Y values on the rect
  const rectCenterX = (boundingClientRect.right - boundingClientRect.left) / 2;
  const rectCenterY = (boundingClientRect.bottom - boundingClientRect.top) / 2;
  const touchX = touch.clientX - boundingClientRect.left;
  const touchY = touch.clientY - boundingClientRect.top;

  return {
    rectCenterX,
    rectCenterY,
    touchX,
    touchY
  }
}
