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



