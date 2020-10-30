# The TII Business Portal Standard Style Guide

## Layouts and Grids

The TII Business portal layout should be based on the Ant Design _Row_ and _Col_ components which support a responsive grid design. They are also based on flex box, and can responsively resize, especially to different breakpoints.

### **The standard Row and Col props for responsive design**

_xs, sm, md, lg, xl_ : Used for responsive col resizing based on different screen breakpoints

_span_ : replaced by the breakpoint sizing

_offset_ : use instead of empty columns

_align_ : top, middle, bottom vertical alignments


### **Sidebar, Topbar, and Content**

The business portal has a standard sidebar size of 80px. This offset is covered in the SideBar component of ant design. 

The Topbar is present on every page, and is used as a label/reference what section the user is on. Whenever the user has moved to a new page within the same navbar stack, they _must_ indicate a way to move back through the topbar. Text within the topbar is always padded by 1.5em, as indicated through the className prop.

Content within the main page is always padded by a minimum of 4em on the x axis and 2em on the y axis. Secondary content that is navigable from the first accessible page can have a padding of greater than 4em on the x axis, but the y axis paddding should never change.

## Margins, Padding, and Font Size

Margins, padding, and font sizes should _never_ be determined through inline styles or styled components. Using classnames for margins, padding, and font sizes improved the modularity and debugging process of the application

### **Font Size**

Font sizes are always determined through SCSS, where the rfs library is used for responsive font resizing. Media queries support radical font resizing for medium screen breakpoints and below. If a change needs to be made on font resizing, then that change must be reflected in the scss file. Font size debugging may be performed through inline styles, but once the change has been made completely, the adjustment must be transferred over to the classname system.

**Font Sizes Supported by TII (in px)**: 14, 16, 18, 20, 22, 24, 28, 32, 36, 48

### **Margins**

Margins are always determined through scss. They are, by default, assigned using the em unit. The standard margin classNames are below:

_ml_ : Left Margin

_mr_ : Right Margin

_mt_ : Top Margin

_mb_ : Bottom Margin

_mx_ : X-Margin

_my_ : Y-Margin

_m_ : Total Margin

### **Padding**

Padding is always determined through scss. They are, by default, assigned using the em unit. The standard padding classNames are below:

_pl_ : Left Padding

_pr_ : Right Padding

_pt_ : Top Padding

_pb_ : Bottom Padding

_px_ : X-Padding

_py_ : Y-Padding

_p_ : Total Padding
