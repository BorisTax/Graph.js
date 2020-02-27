export const ComponentActions = {
  SET_ACTIVE_SNAP_BUTTON: "SET_ACTIVE_SNAP_BUTTON",
  CLEAR_ACTIVE_SNAP_BUTTON: "CLEAR_ACTIVE_SNAP_BUTTON",
  SET_ACTIVE_CREATE_BUTTON: "SET_ACTIVE_CREATE_BUTTON",
  SET_ACTIVE_LANG_BUTTON: "SET_ACTIVE_LANG_BUTTON",
  SET_ACTIVE_SELECTION_BUTTON: "SET_ACTIVE_SELECTION_BUTTON",
  //SET_ACTIVE_TRANSFORM_BUTTON: "SET_ACTIVE_TRANSFORM_BUTTON",

  setActiveSnapButton: id => {
    return {
      type: ComponentActions.SET_ACTIVE_SNAP_BUTTON,
      payload: id
    };
  },
  clearActiveSnapButton: id => {
    return {
      type: ComponentActions.CLEAR_ACTIVE_SNAP_BUTTON,
      payload: id
    };
  },
  setActiveCreateButton: id => {
    return {
      type: ComponentActions.SET_ACTIVE_CREATE_BUTTON,
      payload: id
    };
  },
  setActiveSelectionButton: id => {
    return {
      type: ComponentActions.SET_ACTIVE_SELECTION_BUTTON,
      payload: id
    };
  },
  // setActiveTransformButton: id => {
  //   return {
  //     type: ComponentActions.SET_ACTIVE_TRANSFORM_BUTTON,
  //     payload: id
  //   };
  // },
  setActiveLangButton: id => {
    return {
      type: ComponentActions.SET_ACTIVE_LANG_BUTTON,
      payload: id
    };
  }
};
