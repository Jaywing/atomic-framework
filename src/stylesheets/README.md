# CSS Architecture
## File structure
```
scss/
|-- settings/                           # global variables
|   |-- settings.global.scss            # global base line variables (font size, line-height etc.)
|   |-- settings.colors.scss            # define color palette and assign to globa variables
|   |-- settings.media-queries.scss     # define media query settings
|   |-- settings.z-index.scss           # define z-index levels to be used globally
|   ...
|-- vendor/                             # vendor specific styles (include early for easy overrides)
|   |-- vendor.jqueryui.scss            # eg. of a vendor specific file
|   ...
|-- tools/                              # global mixins, functions, helpers
|   |-- libs/                           # third party mixin libraries
|   |   |-- bourbon/                    # bourbon.io mixin library
|   |   ...
|   |-- mixins/                         # custom mixins (authored by us)
|   |   |-- tools.center-block.scss
|   |   |-- tools.hide-visually.scss
|   |   ... 
|-- generic/                            # high level global styles eg. box-sizing, reset, fonts, html & body etc.
|   |-- generic.normalize.scss          # Normalize reset
|   |-- generic.fonts.scss              # Importing any custom fonts
|   |-- generic.base.scss               # Settings for HTML and BODY elements
|   ... 
|-- vendor/                             # any styles relating to third-party plugins etc.
|   |-- vendor.pluginName.scss
|   ...
|-- base/                               # Unclassed basic html elements
|   |-- typography/                     # all the typographical elements            
|   |   |-- base.headings.scss      # base styles for headings
|   |   |-- base.lists.scss         # base styles for lists
|   |   ... 
|   |-- forms/                          # all the form related elements 
|   |   |-- base.text-inputs.scss   # base styles for text inputs
|   |   |-- base.range.scss         # base styles for html5 range input
|   |   ... 
|   ...                                 # any other base elements
|-- components/                         # UI specific components
|-- |-- common/
|   |   |-- button/                                 # Complicated components can be split into separate file and put in a directory            
|   |   |   |-- component.button.scss               # Button master file (imports others)
|   |   |   |-- component.button.definition.scss    # Button global definition
|   |   |   |-- component.button.theme.scss         # Presentation style
|   |   |   |-- comonpent.button-basic.theme.scss   # Presentation styles for primary modifier
|   |   |-- component.close.scss        # More simple components can be kept in their own file
|-- |-- objects/
|   |   |-- media/                      # Object are layout specific components
|   |   |   |-- component.media.scss    # Component styles
|   ... 
|-- trumps/                             # Utilities, helpers, overrides and browser hacks
|   |-- trumps.typography.scss          # typography utilities like .t-nobr or .t-textCenter
    |-- trumps.print.scss               # any print specific styles
|   ...
|   |-- trumps.shame.scss               # place for any quick fixes or dirty hacks (must be refactored into the code base eventually)
```

## ITCSS

This scss file structure follows the [ITCSS (Inverted triangle CSS)](http://www.creativebloq.com/web-design/manage-large-scale-web-projects-new-css-architecture-itcss-41514731/2) methodology.

ITCSS splits styles into 8 layers and the theory dictates that the layers go from the most generic, universal styles and increase in specificity with every layer (hence the inverted triangle).

This format allows us to write our styles in an order that only ever adds to and inherits from what came previously.

### Layers:

Each of these layers has it own directory in the file system.

1. **Settings**     (Global variables (must be prefixed with 'g-' eg. g-base-font-size) - component/object specific variables should be in the partial it relates to)
2. **Tools**        (Global mixins and functions - component/object specific mixins/functions should be in the partial it relates to)
3. **Generic**	    (High level global styles - Eg. Reset, box-sizing)
4. **Vendor**       (Third party styles for plugins -included before our custom styles so they can be over-written)
5. **Elements**	    (Base styling for bare un-classed HTML elements)
6. **Objects**	    (Non-cosmetic design patterns often concerned with layout, should be re-usable - eg. o-Wrapper)
7. **Components**	(UI specific component styling)
8. **Trumps**	    (Utilities, helpers, overrides and browser hacks. These should be minimal if everything above is correct. Eg. .t-clearfix)

## Class names

The naming convention for classes is based on [SUIT.CSS](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md) but adapted slightly to suit the ITCSS structure.

### Objects

Syntax: o-&lt;ObjectName&gt;[Xxs|Xs|Sm|Md|Lg|Xl|Xxl][-decendentName][--modifierName]

Object class names consist of:

* Object prefix (o-)                - **Mandatory**     - *to easily distinguish between Object classes and Component classes (which don't have a prefix)*
* Object name (ObjectName)          - **Mandatory**     - *must be pascal case*
* Responsive utility (Sm)           - **Not Mandatory** - *corresponds to the responsive breakpoints defined in the Settings folder*
* Descendant name (-descendantName) - **Not Mandatory** - *is attached to a decendant node of an object - must be camel case*
* Modifier name (--modifierName)    - **Not Mandatory** - *modifies the presentation of the base component in some form - must be camel case*

Example object class name: **o-GridSm-cell--wide**

### Components

Syntax: &lt;ComponentName&gt;[-decendentName][--modifierName]

Components class names consist of:

* Component name (ObjectName)       - **Mandatory**     - *must be pascal case*
* Descendant name (-descendantName) - **Not Mandatory** - *is attached to a decendant node of an object - must be camel case*
* Modifier name (--modifierName)    - **Not Mandatory** - *modifies the presentation of the base component in some form - must be camel case*

Example component class name: **o-lg-Media-figure--wide**

### Trumps

Syntax: trumpName

Trump class names consist of:

* Trump name (trumpName) - **Mandatory** - *must be camel case*

Example trump class name: **textCenter**

### State class names

Syntax: ComponentName|o-ObjectName.is-|has-<stateName>

State class names must always be used as joining classes to components or objects. 
This means that the same state names can be used in multiple contexts, but every component must define its own styles for the state (as they are scoped to the component).

State class names consist of:

* State prefix (is-|has-) - **Mandatory** - *Describes the type of state (eg. is-active or has-focus)*
* State name (stateName)  - **Mandatory** - *must be camel case*

Example state class name: **.NavBar.is-active**

## Coding style

### Anatomy of a css class: 

1. $varibles - should always appear at the top and should only be relative to this particular class
2. @extend(s) - although these should be avoided, if needed, should be placed at the top (after any variables)
3. @include(s) - mixins, should be placed at the top too (after any variables or extends) 
4. Properties of the selector - in no particular order
5. Pseudo selectors (eg. :hover, :last-child etc.)
6. Child element selectors - remember not to nest more than 2 deep. Add a sub class if there is too much nesting
7. State classes - any adjoining classes regarding state eg. &.is-active.

```scss
.MyClass,
.MyOtherClass {
  // Any $variables specific to this class
  $myVariable: 1rem;

  // Any @extends - remember these should be avoided as much as possible
  @extend %myPlaceholder;
  
  // Any @includes - mixins 
  @include center-block(75%);
  @include clearfix;  
  
  // Properties of the selector  (in no particular order)
  color: $color-fore;
  background: $color-back;
  padding: $myVariable;
  
  // Pseudo selectors
  &:hover, &:focus {
    text-decoration: underline;
  }
  &:last-child {
    margin-right: 0;
  }
  &::after {
    content: 'Hey';
  }
  
  // Child element selectors (remember we should avoid nesting as much as possible)
  & > li {
    margin: 10px;
  }
  
  // State classes
  &.is-active {
    color: $color-active;
  }
}
```

### Variables

#### Global variables

* Prefix global variable with `g-` to differentiate them from component specific variables
* When utilising a global variable within a component, assign it to local variable at the top of the page or class. This help to decouple a component for re-use in other projects.

#### Variablise all common numbers and numbers with meaning

If you find yourself using a number other than 0 or 100% over and over, it likely deserves a variable. Since it likely has meaning and controls consistency, being able to tweak it en masse may be useful.
If a number clearly has strong meaning, that's a use case for variablising as well.

```scss
$g-z-BgVideo: -1;
$g-z-Header: 2000;
$g-z-Overlay: 5000;
$g-z-Message: 5050;

.BgVideo {
  z-index: $g-z-BgVideo;

.Header {
  z-index: $g-z-Header;
}
.Overlay {
  z-index: $g-z-Overlay;
}
.Message {
  z-index: $g-z-Message;
}
```

#### Mixins

* Mixins that output selectors should be capital-case: @mixin GridBuilder
* Mixins that output only properties should be camel-case: @mixin borderBox
* Private mixins that are not used outside of the current file should be prefixed with a dash: @mixin -gridHelper
* Mixins should be documented

```scss
/*
  Arguments:
    $off      - Color(s) for the "off" state.
                A list of two values will designate color and background-color (in order).
                One value will be interpreted as color — unless the $bg argument, below, is
                set to true, in which case it will be background-color.
    $on       - Color(s) for the "on" state (:hover and :focus). One or two values,
                interpreted the same way as $off, above.
    $duration - default: 0
                The transition-duration between $off and $on states.
    $bg       - default: false
                Set to true if you want to pass a single color value for the $off and $on
                arguments and you want that value interpreted as background-color.
                (By default, a single value will be interpreted as color.)

  Usage:
    // Only text 'color' changes, with a transition
    .element {
      @include color-swap-on-hover($color-dark, $color-light, 1s);
    }

    // Both text 'color' and 'background-color' change, with no transition
    .element {
      @include color-swap-on-hover($color-light $color-dark, $color-dark $color-light);
    }

    // Only 'background-color' change, with a transition
    .element {
      @include color-swap-on-hover($color-dark, $color-light, 0.5s, true);
    }
*/

@mixin color-swap-on-hover (
  $off,
  $on,
  $duration: 0,
  $bg: false
) {

  $transition-properties: null;
  $off-is-list: type-of($off) == list;
  $on-is-list: type-of($on) == list;

  // If $off IS a list,
  // assign color and background-color.
  @if $off-is-list {
    color: nth($off, 1);
    background-color: nth($off, 2);
    $transition-properties: background-color, color;
  }

    // If $off IS NOT a list and $bg is TRUE,
    // assign background-color.
  @else if $bg and not($off-is-list) {
    background-color: $off;
    $transition-properties: background-color;
  }

    // If $off IS NOT a list and $bg is FALSE,
    // assign color.
  @else {
    color: $off;
    $transition-properties: color;
  }

  // Only set-up transition if $duration != 0.
  @if $duration != 0 {
    transition-property: $transition-properties;
    transition-duration: $duration;
  }

  &:hover,
  &:focus {

    // $on is treated the same as $off, above.
    @if $on-is-list {
      color: nth($on, 1);
      background-color: nth($on, 2);
    }

    @else if $bg and not($on-is-list) {
      background-color: $on;
    }

    @else {
      color: $on;
    }
  }

}
```

### Rules

Writing good Sass code starts with correctly dividing and modularizing your objects. 
It is arguably more important than any other aspect of writing CSS.

#### SCSS Lint

[SCSS Lint](https://www.npmjs.com/package/gulp-scss-lint) is installed and runs everytime a .scss file is updated.

The rules for the linter can be found and amended in the lint.yml file in the root of 'stylesheets'.

Folders that don't get linted are 'vendor' and 'trumps'.

#### Well-written Sass is:

##### Decoupled

Objects should never manipulate other objects. eg. .Message would never change the style of a nested object called .List. 
Instead use child selectors like .Message-list and use both classes in the markup `<div class="List Message-list">` or use a modifier `<div class="Message"><div class="List List--small"></div></div>`

##### Specific

Break functionality into smaller objects. Each object should do one thing and do it well.

##### Not location-based

Never, ever use location-based styling. This means a block is never styled different because it is within another block. Objects should have "modifiers" instead of location-related styles .Block--large {} instead of #sidebar .block {}

##### Never hung from IDs

Yep, never. You don't need them and they aren't re-usable by nature

##### Separates layout from style.

This means an object that handles background and border won't control padding and margin. Styles generally fall into a couple of categories: layout, texture, typography. Each object should generally only handle one of these. But be pragmatic about it and consider reusability at all times.

##### Never nested more than 2 deep

With the class naming convention outlined below, there should be no need to nest selectors

##### Not overly extended

Ovoid using `@extend` (leads code bloat). Use mix-ins instead. If you have to extend, only extend placeholders ( eg. `%myPlacehodler {}` ) http://csswizardry.com/2014/11/when-to-use-extend-when-to-use-a-mixin/

##### Indented

Indentation should be 2 spaces

##### File structure

* Each logical module of code should belong in its own file. Avoiding putting multiple objects in the same file. This allows you to use the filesystem to navigate your Sass rather than relying on comment blocks.
* Mixins/placeholders/functions should, if possible, belong in their own file.
* Files should be named for the component they are housing. A BlockList object will live in a BlockList.scss file.

