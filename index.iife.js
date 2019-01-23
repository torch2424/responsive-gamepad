(function () {
	'use strict';

	var VNode = function VNode() {};

	var options = {};

	var stack = [];

	var EMPTY_CHILDREN = [];

	function h(nodeName, attributes) {
		var children = EMPTY_CHILDREN,
		    lastSimple,
		    child,
		    simple,
		    i;
		for (i = arguments.length; i-- > 2;) {
			stack.push(arguments[i]);
		}
		if (attributes && attributes.children != null) {
			if (!stack.length) stack.push(attributes.children);
			delete attributes.children;
		}
		while (stack.length) {
			if ((child = stack.pop()) && child.pop !== undefined) {
				for (i = child.length; i--;) {
					stack.push(child[i]);
				}
			} else {
				if (typeof child === 'boolean') child = null;

				if (simple = typeof nodeName !== 'function') {
					if (child == null) child = '';else if (typeof child === 'number') child = String(child);else if (typeof child !== 'string') simple = false;
				}

				if (simple && lastSimple) {
					children[children.length - 1] += child;
				} else if (children === EMPTY_CHILDREN) {
					children = [child];
				} else {
					children.push(child);
				}

				lastSimple = simple;
			}
		}

		var p = new VNode();
		p.nodeName = nodeName;
		p.children = children;
		p.attributes = attributes == null ? undefined : attributes;
		p.key = attributes == null ? undefined : attributes.key;

		return p;
	}

	function extend(obj, props) {
	  for (var i in props) {
	    obj[i] = props[i];
	  }return obj;
	}

	function applyRef(ref, value) {
	  if (ref != null) {
	    if (typeof ref == 'function') ref(value);else ref.current = value;
	  }
	}

	var defer = typeof Promise == 'function' ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout;

	var IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;

	var items = [];

	function enqueueRender(component) {
		if (!component._dirty && (component._dirty = true) && items.push(component) == 1) {
			(defer)(rerender);
		}
	}

	function rerender() {
		var p;
		while (p = items.pop()) {
			if (p._dirty) renderComponent(p);
		}
	}

	function isSameNodeType(node, vnode, hydrating) {
		if (typeof vnode === 'string' || typeof vnode === 'number') {
			return node.splitText !== undefined;
		}
		if (typeof vnode.nodeName === 'string') {
			return !node._componentConstructor && isNamedNode(node, vnode.nodeName);
		}
		return hydrating || node._componentConstructor === vnode.nodeName;
	}

	function isNamedNode(node, nodeName) {
		return node.normalizedNodeName === nodeName || node.nodeName.toLowerCase() === nodeName.toLowerCase();
	}

	function getNodeProps(vnode) {
		var props = extend({}, vnode.attributes);
		props.children = vnode.children;

		var defaultProps = vnode.nodeName.defaultProps;
		if (defaultProps !== undefined) {
			for (var i in defaultProps) {
				if (props[i] === undefined) {
					props[i] = defaultProps[i];
				}
			}
		}

		return props;
	}

	function createNode(nodeName, isSvg) {
		var node = isSvg ? document.createElementNS('http://www.w3.org/2000/svg', nodeName) : document.createElement(nodeName);
		node.normalizedNodeName = nodeName;
		return node;
	}

	function removeNode(node) {
		var parentNode = node.parentNode;
		if (parentNode) parentNode.removeChild(node);
	}

	function setAccessor(node, name, old, value, isSvg) {
		if (name === 'className') name = 'class';

		if (name === 'key') ; else if (name === 'ref') {
			applyRef(old, null);
			applyRef(value, node);
		} else if (name === 'class' && !isSvg) {
			node.className = value || '';
		} else if (name === 'style') {
			if (!value || typeof value === 'string' || typeof old === 'string') {
				node.style.cssText = value || '';
			}
			if (value && typeof value === 'object') {
				if (typeof old !== 'string') {
					for (var i in old) {
						if (!(i in value)) node.style[i] = '';
					}
				}
				for (var i in value) {
					node.style[i] = typeof value[i] === 'number' && IS_NON_DIMENSIONAL.test(i) === false ? value[i] + 'px' : value[i];
				}
			}
		} else if (name === 'dangerouslySetInnerHTML') {
			if (value) node.innerHTML = value.__html || '';
		} else if (name[0] == 'o' && name[1] == 'n') {
			var useCapture = name !== (name = name.replace(/Capture$/, ''));
			name = name.toLowerCase().substring(2);
			if (value) {
				if (!old) node.addEventListener(name, eventProxy, useCapture);
			} else {
				node.removeEventListener(name, eventProxy, useCapture);
			}
			(node._listeners || (node._listeners = {}))[name] = value;
		} else if (name !== 'list' && name !== 'type' && !isSvg && name in node) {
			try {
				node[name] = value == null ? '' : value;
			} catch (e) {}
			if ((value == null || value === false) && name != 'spellcheck') node.removeAttribute(name);
		} else {
			var ns = isSvg && name !== (name = name.replace(/^xlink:?/, ''));

			if (value == null || value === false) {
				if (ns) node.removeAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase());else node.removeAttribute(name);
			} else if (typeof value !== 'function') {
				if (ns) node.setAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase(), value);else node.setAttribute(name, value);
			}
		}
	}

	function eventProxy(e) {
		return this._listeners[e.type](e);
	}

	var mounts = [];

	var diffLevel = 0;

	var isSvgMode = false;

	var hydrating = false;

	function flushMounts() {
		var c;
		while (c = mounts.shift()) {
			if (c.componentDidMount) c.componentDidMount();
		}
	}

	function diff(dom, vnode, context, mountAll, parent, componentRoot) {
		if (!diffLevel++) {
			isSvgMode = parent != null && parent.ownerSVGElement !== undefined;

			hydrating = dom != null && !('__preactattr_' in dom);
		}

		var ret = idiff(dom, vnode, context, mountAll, componentRoot);

		if (parent && ret.parentNode !== parent) parent.appendChild(ret);

		if (! --diffLevel) {
			hydrating = false;

			if (!componentRoot) flushMounts();
		}

		return ret;
	}

	function idiff(dom, vnode, context, mountAll, componentRoot) {
		var out = dom,
		    prevSvgMode = isSvgMode;

		if (vnode == null || typeof vnode === 'boolean') vnode = '';

		if (typeof vnode === 'string' || typeof vnode === 'number') {
			if (dom && dom.splitText !== undefined && dom.parentNode && (!dom._component || componentRoot)) {
				if (dom.nodeValue != vnode) {
					dom.nodeValue = vnode;
				}
			} else {
				out = document.createTextNode(vnode);
				if (dom) {
					if (dom.parentNode) dom.parentNode.replaceChild(out, dom);
					recollectNodeTree(dom, true);
				}
			}

			out['__preactattr_'] = true;

			return out;
		}

		var vnodeName = vnode.nodeName;
		if (typeof vnodeName === 'function') {
			return buildComponentFromVNode(dom, vnode, context, mountAll);
		}

		isSvgMode = vnodeName === 'svg' ? true : vnodeName === 'foreignObject' ? false : isSvgMode;

		vnodeName = String(vnodeName);
		if (!dom || !isNamedNode(dom, vnodeName)) {
			out = createNode(vnodeName, isSvgMode);

			if (dom) {
				while (dom.firstChild) {
					out.appendChild(dom.firstChild);
				}
				if (dom.parentNode) dom.parentNode.replaceChild(out, dom);

				recollectNodeTree(dom, true);
			}
		}

		var fc = out.firstChild,
		    props = out['__preactattr_'],
		    vchildren = vnode.children;

		if (props == null) {
			props = out['__preactattr_'] = {};
			for (var a = out.attributes, i = a.length; i--;) {
				props[a[i].name] = a[i].value;
			}
		}

		if (!hydrating && vchildren && vchildren.length === 1 && typeof vchildren[0] === 'string' && fc != null && fc.splitText !== undefined && fc.nextSibling == null) {
			if (fc.nodeValue != vchildren[0]) {
				fc.nodeValue = vchildren[0];
			}
		} else if (vchildren && vchildren.length || fc != null) {
				innerDiffNode(out, vchildren, context, mountAll, hydrating || props.dangerouslySetInnerHTML != null);
			}

		diffAttributes(out, vnode.attributes, props);

		isSvgMode = prevSvgMode;

		return out;
	}

	function innerDiffNode(dom, vchildren, context, mountAll, isHydrating) {
		var originalChildren = dom.childNodes,
		    children = [],
		    keyed = {},
		    keyedLen = 0,
		    min = 0,
		    len = originalChildren.length,
		    childrenLen = 0,
		    vlen = vchildren ? vchildren.length : 0,
		    j,
		    c,
		    f,
		    vchild,
		    child;

		if (len !== 0) {
			for (var i = 0; i < len; i++) {
				var _child = originalChildren[i],
				    props = _child['__preactattr_'],
				    key = vlen && props ? _child._component ? _child._component.__key : props.key : null;
				if (key != null) {
					keyedLen++;
					keyed[key] = _child;
				} else if (props || (_child.splitText !== undefined ? isHydrating ? _child.nodeValue.trim() : true : isHydrating)) {
					children[childrenLen++] = _child;
				}
			}
		}

		if (vlen !== 0) {
			for (var i = 0; i < vlen; i++) {
				vchild = vchildren[i];
				child = null;

				var key = vchild.key;
				if (key != null) {
					if (keyedLen && keyed[key] !== undefined) {
						child = keyed[key];
						keyed[key] = undefined;
						keyedLen--;
					}
				} else if (min < childrenLen) {
						for (j = min; j < childrenLen; j++) {
							if (children[j] !== undefined && isSameNodeType(c = children[j], vchild, isHydrating)) {
								child = c;
								children[j] = undefined;
								if (j === childrenLen - 1) childrenLen--;
								if (j === min) min++;
								break;
							}
						}
					}

				child = idiff(child, vchild, context, mountAll);

				f = originalChildren[i];
				if (child && child !== dom && child !== f) {
					if (f == null) {
						dom.appendChild(child);
					} else if (child === f.nextSibling) {
						removeNode(f);
					} else {
						dom.insertBefore(child, f);
					}
				}
			}
		}

		if (keyedLen) {
			for (var i in keyed) {
				if (keyed[i] !== undefined) recollectNodeTree(keyed[i], false);
			}
		}

		while (min <= childrenLen) {
			if ((child = children[childrenLen--]) !== undefined) recollectNodeTree(child, false);
		}
	}

	function recollectNodeTree(node, unmountOnly) {
		var component = node._component;
		if (component) {
			unmountComponent(component);
		} else {
			if (node['__preactattr_'] != null) applyRef(node['__preactattr_'].ref, null);

			if (unmountOnly === false || node['__preactattr_'] == null) {
				removeNode(node);
			}

			removeChildren(node);
		}
	}

	function removeChildren(node) {
		node = node.lastChild;
		while (node) {
			var next = node.previousSibling;
			recollectNodeTree(node, true);
			node = next;
		}
	}

	function diffAttributes(dom, attrs, old) {
		var name;

		for (name in old) {
			if (!(attrs && attrs[name] != null) && old[name] != null) {
				setAccessor(dom, name, old[name], old[name] = undefined, isSvgMode);
			}
		}

		for (name in attrs) {
			if (name !== 'children' && name !== 'innerHTML' && (!(name in old) || attrs[name] !== (name === 'value' || name === 'checked' ? dom[name] : old[name]))) {
				setAccessor(dom, name, old[name], old[name] = attrs[name], isSvgMode);
			}
		}
	}

	var recyclerComponents = [];

	function createComponent(Ctor, props, context) {
		var inst,
		    i = recyclerComponents.length;

		if (Ctor.prototype && Ctor.prototype.render) {
			inst = new Ctor(props, context);
			Component.call(inst, props, context);
		} else {
			inst = new Component(props, context);
			inst.constructor = Ctor;
			inst.render = doRender;
		}

		while (i--) {
			if (recyclerComponents[i].constructor === Ctor) {
				inst.nextBase = recyclerComponents[i].nextBase;
				recyclerComponents.splice(i, 1);
				return inst;
			}
		}

		return inst;
	}

	function doRender(props, state, context) {
		return this.constructor(props, context);
	}

	function setComponentProps(component, props, renderMode, context, mountAll) {
		if (component._disable) return;
		component._disable = true;

		component.__ref = props.ref;
		component.__key = props.key;
		delete props.ref;
		delete props.key;

		if (typeof component.constructor.getDerivedStateFromProps === 'undefined') {
			if (!component.base || mountAll) {
				if (component.componentWillMount) component.componentWillMount();
			} else if (component.componentWillReceiveProps) {
				component.componentWillReceiveProps(props, context);
			}
		}

		if (context && context !== component.context) {
			if (!component.prevContext) component.prevContext = component.context;
			component.context = context;
		}

		if (!component.prevProps) component.prevProps = component.props;
		component.props = props;

		component._disable = false;

		if (renderMode !== 0) {
			if (renderMode === 1 || options.syncComponentUpdates !== false || !component.base) {
				renderComponent(component, 1, mountAll);
			} else {
				enqueueRender(component);
			}
		}

		applyRef(component.__ref, component);
	}

	function renderComponent(component, renderMode, mountAll, isChild) {
		if (component._disable) return;

		var props = component.props,
		    state = component.state,
		    context = component.context,
		    previousProps = component.prevProps || props,
		    previousState = component.prevState || state,
		    previousContext = component.prevContext || context,
		    isUpdate = component.base,
		    nextBase = component.nextBase,
		    initialBase = isUpdate || nextBase,
		    initialChildComponent = component._component,
		    skip = false,
		    snapshot = previousContext,
		    rendered,
		    inst,
		    cbase;

		if (component.constructor.getDerivedStateFromProps) {
			state = extend(extend({}, state), component.constructor.getDerivedStateFromProps(props, state));
			component.state = state;
		}

		if (isUpdate) {
			component.props = previousProps;
			component.state = previousState;
			component.context = previousContext;
			if (renderMode !== 2 && component.shouldComponentUpdate && component.shouldComponentUpdate(props, state, context) === false) {
				skip = true;
			} else if (component.componentWillUpdate) {
				component.componentWillUpdate(props, state, context);
			}
			component.props = props;
			component.state = state;
			component.context = context;
		}

		component.prevProps = component.prevState = component.prevContext = component.nextBase = null;
		component._dirty = false;

		if (!skip) {
			rendered = component.render(props, state, context);

			if (component.getChildContext) {
				context = extend(extend({}, context), component.getChildContext());
			}

			if (isUpdate && component.getSnapshotBeforeUpdate) {
				snapshot = component.getSnapshotBeforeUpdate(previousProps, previousState);
			}

			var childComponent = rendered && rendered.nodeName,
			    toUnmount,
			    base;

			if (typeof childComponent === 'function') {

				var childProps = getNodeProps(rendered);
				inst = initialChildComponent;

				if (inst && inst.constructor === childComponent && childProps.key == inst.__key) {
					setComponentProps(inst, childProps, 1, context, false);
				} else {
					toUnmount = inst;

					component._component = inst = createComponent(childComponent, childProps, context);
					inst.nextBase = inst.nextBase || nextBase;
					inst._parentComponent = component;
					setComponentProps(inst, childProps, 0, context, false);
					renderComponent(inst, 1, mountAll, true);
				}

				base = inst.base;
			} else {
				cbase = initialBase;

				toUnmount = initialChildComponent;
				if (toUnmount) {
					cbase = component._component = null;
				}

				if (initialBase || renderMode === 1) {
					if (cbase) cbase._component = null;
					base = diff(cbase, rendered, context, mountAll || !isUpdate, initialBase && initialBase.parentNode, true);
				}
			}

			if (initialBase && base !== initialBase && inst !== initialChildComponent) {
				var baseParent = initialBase.parentNode;
				if (baseParent && base !== baseParent) {
					baseParent.replaceChild(base, initialBase);

					if (!toUnmount) {
						initialBase._component = null;
						recollectNodeTree(initialBase, false);
					}
				}
			}

			if (toUnmount) {
				unmountComponent(toUnmount);
			}

			component.base = base;
			if (base && !isChild) {
				var componentRef = component,
				    t = component;
				while (t = t._parentComponent) {
					(componentRef = t).base = base;
				}
				base._component = componentRef;
				base._componentConstructor = componentRef.constructor;
			}
		}

		if (!isUpdate || mountAll) {
			mounts.push(component);
		} else if (!skip) {

			if (component.componentDidUpdate) {
				component.componentDidUpdate(previousProps, previousState, snapshot);
			}
		}

		while (component._renderCallbacks.length) {
			component._renderCallbacks.pop().call(component);
		}if (!diffLevel && !isChild) flushMounts();
	}

	function buildComponentFromVNode(dom, vnode, context, mountAll) {
		var c = dom && dom._component,
		    originalComponent = c,
		    oldDom = dom,
		    isDirectOwner = c && dom._componentConstructor === vnode.nodeName,
		    isOwner = isDirectOwner,
		    props = getNodeProps(vnode);
		while (c && !isOwner && (c = c._parentComponent)) {
			isOwner = c.constructor === vnode.nodeName;
		}

		if (c && isOwner && (!mountAll || c._component)) {
			setComponentProps(c, props, 3, context, mountAll);
			dom = c.base;
		} else {
			if (originalComponent && !isDirectOwner) {
				unmountComponent(originalComponent);
				dom = oldDom = null;
			}

			c = createComponent(vnode.nodeName, props, context);
			if (dom && !c.nextBase) {
				c.nextBase = dom;

				oldDom = null;
			}
			setComponentProps(c, props, 1, context, mountAll);
			dom = c.base;

			if (oldDom && dom !== oldDom) {
				oldDom._component = null;
				recollectNodeTree(oldDom, false);
			}
		}

		return dom;
	}

	function unmountComponent(component) {

		var base = component.base;

		component._disable = true;

		if (component.componentWillUnmount) component.componentWillUnmount();

		component.base = null;

		var inner = component._component;
		if (inner) {
			unmountComponent(inner);
		} else if (base) {
			if (base['__preactattr_'] != null) applyRef(base['__preactattr_'].ref, null);

			component.nextBase = base;

			removeNode(base);
			recyclerComponents.push(component);

			removeChildren(base);
		}

		applyRef(component.__ref, null);
	}

	function Component(props, context) {
		this._dirty = true;

		this.context = context;

		this.props = props;

		this.state = this.state || {};

		this._renderCallbacks = [];
	}

	extend(Component.prototype, {
		setState: function setState(state, callback) {
			if (!this.prevState) this.prevState = this.state;
			this.state = extend(extend({}, this.state), typeof state === 'function' ? state(this.state, this.props) : state);
			if (callback) this._renderCallbacks.push(callback);
			enqueueRender(this);
		},
		forceUpdate: function forceUpdate(callback) {
			if (callback) this._renderCallbacks.push(callback);
			renderComponent(this, 2);
		},
		render: function render() {}
	});

	function render(vnode, parent, merge) {
	  return diff(merge, vnode, {}, false, parent, false);
	}

	function d(a) {
	  for (var b = 1; b < arguments.length; b++) {
	    var c = null != arguments[b] ? arguments[b] : {},
	        e = Object.keys(c);
	    "function" === typeof Object.getOwnPropertySymbols && (e = e.concat(Object.getOwnPropertySymbols(c).filter(function (a) {
	      return Object.getOwnPropertyDescriptor(c, a).enumerable;
	    })));
	    e.forEach(function (b) {
	      var e = c[b];
	      b in a ? Object.defineProperty(a, b, {
	        value: e,
	        enumerable: !0,
	        configurable: !0,
	        writable: !0
	      }) : a[b] = e;
	    });
	  }

	  return a;
	}

	let g = {
	  DPAD_UP: "DPAD_UP",
	  DPAD_RIGHT: "DPAD_RIGHT",
	  DPAD_DOWN: "DPAD_DOWN",
	  DPAD_LEFT: "DPAD_LEFT",
	  LEFT_ANALOG_HORIZONTAL_AXIS: "LEFT_ANALOG_HORIZONTAL_AXIS",
	  LEFT_ANALOG_VERTICAL_AXIS: "LEFT_ANALOG_VERTICAL_AXIS",
	  LEFT_ANALOG_UP: "LEFT_ANALOG_UP",
	  LEFT_ANALOG_RIGHT: "LEFT_ANALOG_RIGHT",
	  LEFT_ANALOG_DOWN: "LEFT_ANALOG_DOWN",
	  LEFT_ANALOG_LEFT: "LEFT_ANALOG_LEFT",
	  RIGHT_ANALOG_HORIZONTAL_AXIS: "RIGHT_ANALOG_HORIZONTAL_AXIS",
	  RIGHT_ANALOG_VERTICAL_AXIS: "RIGHT_ANALOG_VERTICAL_AXIS",
	  RIGHT_ANALOG_UP: "RIGHT_ANALOG_UP",
	  RIGHT_ANALOG_RIGHT: "RIGHT_ANALOG_RIGHT",
	  RIGHT_ANALOG_DOWN: "RIGHT_ANALOG_DOWN",
	  RIGHT_ANALOG_LEFT: "RIGHT_ANALOG_LEFT",
	  A: "A",
	  B: "B",
	  X: "X",
	  Y: "Y",
	  LEFT_TRIGGER: "LEFT_TRIGGER",
	  LEFT_BUMPER: "LEFT_BUMPER",
	  RIGHT_TRIGGER: "RIGHT_TRIGGER",
	  RIGHT_BUMPER: "RIGHT_BUMPER",
	  SELECT: "SELECT",
	  START: "START",
	  SPECIAL: "SPECIAL"
	};

	class h$1 {
	  constructor() {}

	  enable() {
	    throw Error("enable() must be overridden");
	  }

	  disable() {
	    throw Error("disable() must be overridden");
	  }

	  getState() {
	    throw Error("getState() must be overridden");
	  }

	}

	let k = "input textarea button select option optgroup label datalist".split(" "),
	    l = ["Alt", "Control", "Meta", "OS"];

	class m extends h$1 {
	  constructor() {
	    super();
	    this.keymap = {};
	    Object.keys(g).forEach(a => {
	      this.keymap[a] = {
	        keys: [],
	        value: void 0
	      };
	    });
	    this.enableIgnoreWhenInputElementFocused();
	    this.enableIgnoreWhenModifierState();
	    this._boundUpdateKeymapValues = this._updateKeymapValues.bind(this);
	  }

	  enable() {
	    if ("undefined" === typeof window) throw Error("Keyboard can only be used with a browser environment");
	    window.addEventListener("keyup", this._boundUpdateKeymapValues);
	    window.addEventListener("keydown", this._boundUpdateKeymapValues);
	  }

	  disable() {
	    if ("undefined" === typeof window) throw Error("Keyboard can only be used with a browser environment");
	    window.removeEventListener("keyup", this._boundUpdateKeymapValues);
	    window.removeEventListener("keydown", this._boundUpdateKeymapValues);
	  }

	  getState() {
	    let a = d({}, g);
	    Object.keys(this.keymap).forEach(b => {
	      a[b] = this.keymap[b].value;
	    });
	    Object.keys(a).forEach(b => {
	      "string" === typeof a[b] && delete a[b];
	    });
	    return a;
	  }

	  enableIgnoreWhenInputElementFocused() {
	    this.ignoreWhenInputElementFocused = !0;
	  }

	  disableIgnoreWhenInputElementFocused() {
	    this.ignoreWhenInputElementFocused = !1;
	  }

	  enableIgnoreWhenModifierState() {
	    this.ignoreOnModifierState = !0;
	  }

	  disableIgnoreWhenModifierState() {
	    this.ignoreOnModifierState = !1;
	  }

	  setKeysToResponsiveGamepadInput(a, b) {
	    if (!a || !b || 0 === a.length) throw Error("Could not set the specificed keyboard keys to input");
	    "string" === typeof a && (a = [a]);
	    this.keymap[b].keys = a;
	  }

	  _isFocusedOnInputElement() {
	    return k.some(a => document.activeElement && document.activeElement.tagName.toLowerCase() === a.toLowerCase() ? !0 : !1);
	  }

	  _isInModifierState(a) {
	    return l.some(b => a.getModifierState(b) || a.code === b);
	  }

	  _updateKeymapValues(a) {
	    this.ignoreWhenInputElementFocused && this._isFocusedOnInputElement() || this.ignoreOnModifierState && this._isInModifierState(a) || (a.preventDefault(), Object.keys(this.keymap).some(b => this.keymap[b].keys.some(c => c === a.code ? (this.keymap[b].value = "keydown" === a.type ? !0 : !1, !0) : !1)));
	  }

	}

	class n extends h$1 {
	  constructor() {
	    super();
	    this.gamepadAnalogStickDeadZone = .25;
	    this.keymap = {};
	  }

	  enable() {}

	  disable() {}

	  getState(a) {
	    let b = this._getGamepads();

	    a || (a = 0);
	    let c = b[a];
	    if (!c) return !1;
	    Object.keys(this.keymap).forEach(a => {
	      if (this.keymap[a].buttons) this.keymap[a].value = this.keymap[a].buttons.some(a => this._isButtonPressed(c, a));else if (this.keymap[a].axis) {
	        let b = this._getAnalogStickAxis(c, this.keymap[a].axis);

	        this.keymap[a].value = b;
	      }
	    });
	    let e = d({}, g);
	    Object.keys(this.keymap).forEach(a => {
	      e[a] = this.keymap[a].value;
	    });
	    e[g.LEFT_ANALOG_DOWN] = e.LEFT_ANALOG_VERTICAL_AXIS > this.gamepadAnalogStickDeadZone;
	    e[g.LEFT_ANALOG_UP] = e.LEFT_ANALOG_VERTICAL_AXIS < -1 * this.gamepadAnalogStickDeadZone;
	    e[g.LEFT_ANALOG_RIGHT] = e.LEFT_ANALOG_HORIZONTAL_AXIS > this.gamepadAnalogStickDeadZone;
	    e[g.LEFT_ANALOG_LEFT] = e.LEFT_ANALOG_HORIZONTAL_AXIS < -1 * this.gamepadAnalogStickDeadZone;
	    e[g.RIGHT_ANALOG_DOWN] = e.RIGHT_ANALOG_VERTICAL_AXIS > this.gamepadAnalogStickDeadZone;
	    e[g.RIGHT_ANALOG_UP] = e.RIGHT_ANALOG_VERTICAL_AXIS < -1 * this.gamepadAnalogStickDeadZone;
	    e[g.RIGHT_ANALOG_RIGHT] = e.RIGHT_ANALOG_HORIZONTAL_AXIS > this.gamepadAnalogStickDeadZone;
	    e[g.RIGHT_ANALOG_LEFT] = e.RIGHT_ANALOG_HORIZONTAL_AXIS < -1 * this.gamepadAnalogStickDeadZone;
	    Object.keys(e).forEach(a => {
	      "string" === typeof e[a] && delete e[a];
	    });
	    return e;
	  }

	  setGamepadButtonsToResponsiveGamepadInput(a, b) {
	    if (!a || !b || 0 === a.length) throw Error("Could not set the specificed buttons to input");
	    "number" === typeof a && (a = [a]);
	    this.keymap[b] = {};
	    this.keymap[b].buttons = a;
	  }

	  setGamepadAxisToResponsiveGamepadInput(a, b) {
	    if (void 0 === a || !b) throw Error("Could not set the specificed buttons to input");
	    if ("number" === typeof axes) throw Error("Must pass in an axis id");
	    this.keymap[b] = {};
	    this.keymap[b].axis = a;
	  }

	  _isButtonPressed(a, b) {
	    return a.buttons[b] ? a.buttons[b].pressed : !1;
	  }

	  _getGamepads() {
	    return navigator.getGamepads ? navigator.getGamepads() : [];
	  }

	  _getAnalogStickAxis(a, b) {
	    return a ? a.axes[b] || 0 : 0;
	  }

	}

	let q = "touchstart touchmove touchend mousedown mousemove mouseup mouseleave".split(" ");

	class r {
	  constructor(a) {
	    if (!a) throw Error("Touch inputs require an element.");
	    this.listeners = [];
	    this.element = a;

	    this._addTouchStyles();

	    this.boundingClientRect = void 0;

	    this._updateElementBoundingClientRect();

	    this.active = !1;
	    this.boundUpdateElementRect = this._updateElementBoundingClientRect.bind(this);
	    this.boundTouchEvent = this._touchEvent.bind(this);
	  }

	  remove() {
	    this._removeTouchStyles();

	    this.stopListening();
	    this.element = void 0;
	  }

	  listen() {
	    if (!this.element) throw Error("You must supply an element first with add()");
	    window.addEventListener("resize", this.boundUpdateElementRect);
	    q.forEach(a => {
	      this.element.addEventListener(a, this.boundTouchEvent);
	    });
	  }

	  stopListening() {
	    if (!this.element) throw Error("You must supply an element first with add()");
	    window.removeEventListener("resize", this.boundUpdateElementRect);
	    q.forEach(a => {
	      this.element.removeEventListener(a, this.boundTouchEvent);
	    });
	  }

	  _touchEvent(a) {
	    if (a && (!a.type.includes("touch") || a.touches)) {
	      a.preventDefault();
	      var b = "touchstart" === a.type || "touchmove" === a.type || "mousedown" === a.type,
	          c = "mousemove" === a.type,
	          e = !b && !c;

	      this._updateActiveStatus(b, e);

	      this._updateTouchStyles(b, c, e);

	      if (this.onTouchEvent) this.onTouchEvent(a, b, c, e);
	    }
	  }

	  _updateElementBoundingClientRect() {
	    this.boundingClientRect = this.element.getBoundingClientRect();
	  }

	  _addTouchStyles() {
	    this.element.style.userSelect = "none";
	  }

	  _removeTouchStyles() {
	    this.element.style.userSelect = "";
	  }

	  _updateTouchStyles(a, b) {
	    b || (a ? this.element.classList.add("active") : this.element.classList.remove("active"));
	  }

	  _updateActiveStatus(a, b) {
	    this.active && b ? this.active = !1 : !this.active && a && (this.active = !0);
	  }

	}

	function t(a, b) {
	  let c;
	  a.type.includes("touch") ? c = a.touches[0] : a.type.includes("mouse") && (c = a);
	  return {
	    rectCenterX: (b.right - b.left) / 2,
	    rectCenterY: (b.bottom - b.top) / 2,
	    touchX: c.clientX - b.left,
	    touchY: c.clientY - b.top
	  };
	}

	class u extends r {
	  constructor(a, b) {
	    super(a);
	    this.config = b ? b : {
	      allowMultipleDirections: !1
	    };

	    this._resetState();
	  }

	  _resetState() {
	    this.state = {
	      DPAD_UP: !1,
	      DPAD_RIGHT: !1,
	      DPAD_DOWN: !1,
	      DPAD_LEFT: !1
	    };
	  }

	  onTouchEvent(a) {
	    if (this.active) {
	      var {
	        rectCenterX: a,
	        rectCenterY: b,
	        touchX: c,
	        touchY: e
	      } = t(a, this.boundingClientRect);

	      if (!(c > a + this.boundingClientRect.width / 2 + 50)) {
	        this._resetState();

	        var f = this.boundingClientRect.width / 20,
	            p = this.boundingClientRect.height / 20;
	        this.config.allowMultipleDirections ? (this.setHorizontalState(c, f), this.setVerticalState(e, p)) : Math.abs(a - c) + this.boundingClientRect.width / 8 > Math.abs(b - e) ? this.setHorizontalState(c, f) : this.setVerticalState(e);
	      }
	    } else this._resetState();
	  }

	  setHorizontalState(a, b) {
	    b && Math.abs(this.boundingClientRect.width / 2 - a) <= b || (a < this.boundingClientRect.width / 2 ? this.state.DPAD_LEFT = !0 : this.state.DPAD_RIGHT = !0);
	  }

	  setVerticalState(a, b) {
	    b && Math.abs(this.boundingClientRect.height / 2 - a) < b || (a < this.boundingClientRect.height / 2 ? this.state.DPAD_UP = !0 : this.state.DPAD_DOWN = !0);
	  }

	}

	class v extends r {
	  constructor(a) {
	    super(a);

	    this._resetState();
	  }

	  _resetState() {
	    this.state = {
	      HORIZONTAL_AXIS: 0,
	      VERTICAL_AXIS: 0,
	      UP: !1,
	      RIGHT: !1,
	      DOWN: !1,
	      LEFT: !1
	    };
	    this.element.style.transform = "translate(0px, 0px)";
	    this.deadzone = .5;
	  }

	  onTouchEvent(a) {
	    if (this.active) {
	      var {
	        rectCenterX: a,
	        rectCenterY: b,
	        touchX: c,
	        touchY: e
	      } = t(a, this.boundingClientRect);
	      c = (c - a) / a;
	      1 < c ? c = 1 : -1 > c && (c = -1);
	      e = (e - b) / b;
	      1 < e ? e = 1 : -1 > e && (e = -1);
	      this.element.style.transform = `translate(${a * c / 2}px, ${b * e / 2}px)`;
	      this.state.HORIZONTAL_AXIS = c;
	      this.state.VERTICAL_AXIS = e;
	      this.state.UP = !1;
	      this.state.RIGHT = !1;
	      this.state.DOWN = !1;
	      this.state.LEFT = !1;
	      Math.abs(c) > this.deadzone && (0 < c ? this.state.RIGHT = !0 : 0 > c && (this.state.LEFT = !0));
	      Math.abs(e) > this.deadzone && (0 < e ? this.state.DOWN = !0 : 0 > e && (this.state.UP = !0));
	    } else this._resetState();
	  }

	}

	class w extends r {
	  constructor(a, b) {
	    super(a);
	    this.input = b;
	  }

	}

	let x = {
	  LEFT: "LEFT",
	  RIGHT: "RIGHT"
	};

	class y extends h$1 {
	  constructor() {
	    super();
	    this.enabled = !1;
	    this.dpads = [];
	    this.leftAnalogs = [];
	    this.rightAnalogs = [];
	    this.buttons = [];
	  }

	  enable() {
	    if ("undefined" === typeof window) throw Error("TouchInput can only be used with a browser environment");
	    this.enabled = !0;
	    this.dpads.forEach(a => a.listen());
	    this.leftAnalogs.forEach(a => a.listen());
	    this.rightAnalogs.forEach(a => a.listen());
	    this.buttons.forEach(a => a.listen());
	  }

	  disable() {
	    if ("undefined" === typeof window) throw Error("TouchInput can only be used with a browser environment");
	    this.enabled = !1;
	    this.dpads.forEach(a => a.stopListening());
	    this.leftAnalogs.forEach(a => a.stopListening());
	    this.rightAnalogs.forEach(a => a.stopListening());
	    this.buttons.forEach(a => a.stopListening());
	  }

	  getState() {
	    let a = d({}, g);
	    this.buttons.forEach(b => {
	      a[b.input] = b.active;
	    });
	    this.dpads.forEach(b => {
	      Object.keys(b.state).forEach(c => {
	        a[c] = b.state[c] || a[c];
	      });
	    });
	    0 < this.leftAnalogs.length && (a.LEFT_ANALOG_HORIZONTAL_AXIS = this.leftAnalogs[0].state.HORIZONTAL_AXIS, a.LEFT_ANALOG_VERTICAL_AXIS = this.leftAnalogs[0].state.VERTICAL_AXIS, a.LEFT_ANALOG_UP = this.leftAnalogs[0].state.UP, a.LEFT_ANALOG_RIGHT = this.leftAnalogs[0].state.RIGHT, a.LEFT_ANALOG_DOWN = this.leftAnalogs[0].state.DOWN, a.LEFT_ANALOG_LEFT = this.leftAnalogs[0].state.LEFT);
	    0 < this.rightAnalogs.length && (a.RIGHT_ANALOG_HORIZONTAL_AXIS = this.rightAnalogs[0].state.HORIZONTAL_AXIS, a.RIGHT_ANALOG_VERTICAL_AXIS = this.rightAnalogs[0].state.VERTICAL_AXIS, a.RIGHT_ANALOG_UP = this.rightAnalogs[0].state.UP, a.RIGHT_ANALOG_RIGHT = this.rightAnalogs[0].state.RIGHT, a.RIGHT_ANALOG_DOWN = this.rightAnalogs[0].state.DOWN, a.RIGHT_ANALOG_LEFT = this.rightAnalogs[0].state.LEFT);
	    Object.keys(a).forEach(b => {
	      "string" === typeof a[b] && delete a[b];
	    });
	    return a;
	  }

	  addButtonInput(a, b) {
	    let c = new w(a, b);
	    this.enabled && c.listen();
	    this.buttons.push(c);
	    return () => {
	      c.stopListening();
	      this.buttons.splice(this.buttons.indexOf(c), 1);
	    };
	  }

	  addDpadInput(a, b) {
	    let c = new u(a, b);
	    this.enabled && c.listen();
	    this.dpads.push(c);
	    return () => {
	      c.stopListening();
	      this.dpads.splice(this.dpads.indexOf(c), 1);
	    };
	  }

	  addLeftAnalogInput(a) {
	    this.addAnalogInput(a, x.LEFT);
	  }

	  addRightAnalogInput(a) {
	    this.addAnalogInput(a, x.RIGHT);
	  }

	  addAnalogInput(a, b) {
	    let c = new v(a);
	    this.enabled && c.listen();
	    if (b === x.LEFT) return this.leftAnalogs.push(c), () => {
	      c.stopListening();
	      this.leftAnalogs.splice(this.leftAnalogs.indexOf(c), 1);
	    };
	    this.rightAnalogs.push(c);
	    return () => {
	      c.stopListening();
	      this.rightAnalogs.splice(this.rightAnalogs.indexOf(c), 1);
	    };
	  }

	}

	class z {
	  constructor() {
	    this.RESPONSIVE_GAMEPAD_INPUTS = g;
	    this._enabled = !1;
	    this._multipleDirectionInput = !0;
	    this.Keyboard = new m();
	    this.Gamepad = new n();
	    this.TouchInput = new y();
	    this.Keyboard.setKeysToResponsiveGamepadInput(["ArrowUp", "Numpad8"], g.DPAD_UP);
	    this.Keyboard.setKeysToResponsiveGamepadInput(["KeyW"], g.LEFT_ANALOG_UP);
	    this.Keyboard.setKeysToResponsiveGamepadInput(["KeyI"], g.RIGHT_ANALOG_UP);
	    this.Gamepad.setGamepadButtonsToResponsiveGamepadInput([12], g.DPAD_UP);
	    this.Keyboard.setKeysToResponsiveGamepadInput(["ArrowRight", "Numpad6"], g.DPAD_RIGHT);
	    this.Keyboard.setKeysToResponsiveGamepadInput(["KeyD"], g.LEFT_ANALOG_RIGHT);
	    this.Keyboard.setKeysToResponsiveGamepadInput(["KeyL"], g.RIGHT_ANALOG_RIGHT);
	    this.Gamepad.setGamepadButtonsToResponsiveGamepadInput([15], g.DPAD_RIGHT);
	    this.Keyboard.setKeysToResponsiveGamepadInput(["ArrowDown", "Numpad5", "Numpad2"], g.DPAD_DOWN);
	    this.Keyboard.setKeysToResponsiveGamepadInput(["KeyS"], g.LEFT_ANALOG_DOWN);
	    this.Keyboard.setKeysToResponsiveGamepadInput(["KeyK"], g.RIGHT_ANALOG_DOWN);
	    this.Gamepad.setGamepadButtonsToResponsiveGamepadInput([13], g.DPAD_DOWN);
	    this.Keyboard.setKeysToResponsiveGamepadInput(["ArrowLeft", "Numpad4"], g.DPAD_LEFT);
	    this.Keyboard.setKeysToResponsiveGamepadInput(["KeyA"], g.LEFT_ANALOG_LEFT);
	    this.Keyboard.setKeysToResponsiveGamepadInput(["KeyJ"], g.RIGHT_ANALOG_LEFT);
	    this.Gamepad.setGamepadButtonsToResponsiveGamepadInput([14], g.DPAD_LEFT);
	    this.Gamepad.setGamepadAxisToResponsiveGamepadInput([0], g.LEFT_ANALOG_HORIZONTAL_AXIS);
	    this.Gamepad.setGamepadAxisToResponsiveGamepadInput([1], g.LEFT_ANALOG_VERTICAL_AXIS);
	    this.Gamepad.setGamepadAxisToResponsiveGamepadInput([2], g.RIGHT_ANALOG_HORIZONTAL_AXIS);
	    this.Gamepad.setGamepadAxisToResponsiveGamepadInput([3], g.RIGHT_ANALOG_VERTICAL_AXIS);
	    this.Keyboard.setKeysToResponsiveGamepadInput(["KeyX", "Semicolon", "Numpad7"], g.A);
	    this.Gamepad.setGamepadButtonsToResponsiveGamepadInput([0], g.A);
	    this.Keyboard.setKeysToResponsiveGamepadInput(["KeyZ", "Escape", "Quote", "Backspace", "Numpad9"], g.B);
	    this.Gamepad.setGamepadButtonsToResponsiveGamepadInput([1], g.B);
	    this.Keyboard.setKeysToResponsiveGamepadInput(["KeyC"], g.X);
	    this.Gamepad.setGamepadButtonsToResponsiveGamepadInput([2], g.X);
	    this.Keyboard.setKeysToResponsiveGamepadInput(["KeyV"], g.Y);
	    this.Gamepad.setGamepadButtonsToResponsiveGamepadInput([3], g.Y);
	    this.Keyboard.setKeysToResponsiveGamepadInput(["KeyQ"], g.LEFT_TRIGGER);
	    this.Gamepad.setGamepadButtonsToResponsiveGamepadInput([6], g.LEFT_TRIGGER);
	    this.Keyboard.setKeysToResponsiveGamepadInput(["KeyE"], g.LEFT_BUMPER);
	    this.Gamepad.setGamepadButtonsToResponsiveGamepadInput([4], g.LEFT_BUMPER);
	    this.Keyboard.setKeysToResponsiveGamepadInput(["KeyU"], g.RIGHT_TRIGGER);
	    this.Gamepad.setGamepadButtonsToResponsiveGamepadInput([7], g.RIGHT_TRIGGER);
	    this.Keyboard.setKeysToResponsiveGamepadInput(["KeyO"], g.RIGHT_BUMPER);
	    this.Gamepad.setGamepadButtonsToResponsiveGamepadInput([5], g.RIGHT_BUMPER);
	    this.Keyboard.setKeysToResponsiveGamepadInput(["Enter", "Numpad3"], g.START);
	    this.Gamepad.setGamepadButtonsToResponsiveGamepadInput([9], g.START);
	    this.Keyboard.setKeysToResponsiveGamepadInput(["ShiftRight", "ShiftLeft", "Tab", "Numpad1"], g.SELECT);
	    this.Gamepad.setGamepadButtonsToResponsiveGamepadInput([8], g.SELECT);
	    this.Keyboard.setKeysToResponsiveGamepadInput(["Space", "Backslash", "Backquote"], g.SPECIAL);
	    this.Gamepad.setGamepadButtonsToResponsiveGamepadInput([16], g.SPECIAL);
	    this.plugins = [];
	    this.inputChangeMap = {};
	    this.inputChangeOldState = {};
	    this.cancelInputChangeListener = void 0;
	  }

	  getVersion() {
	    return "1.1.0";
	  }

	  enable() {
	    this.Keyboard.enable();
	    this.Gamepad.enable();
	    this.TouchInput.enable();
	    0 < Object.keys(this.inputChangeMap).length && this._startInputChangeInterval();
	    this._enabled = !0;
	  }

	  disable() {
	    this.Keyboard.disable();
	    this.Gamepad.disable();
	    this.TouchInput.disable();
	    this.cancelInputChangeListener && (this.cancelInputChangeListener(), this.cancelInputChangeListener = void 0);
	    this._enabled = !1;
	  }

	  isEnabled() {
	    return this._enabled;
	  }

	  addPlugin(a) {
	    this.plugins.push(a);
	    if (a.onAddPlugin) a.onAddPlugin();
	    return () => {
	      if (a.onRemovePlugin) a.onRemovePlugin();
	      this.plugins.splice(this.plugins.indexOf(a), 1);
	    };
	  }

	  getState() {
	    if (!this._enabled) return {};
	    let a = d({}, g),
	        b = this.Gamepad.getState(),
	        c = this.TouchInput.getState(),
	        e = this.Keyboard.getState();
	    a = d({}, g);
	    Object.keys(a).forEach(f => {
	      a[f] = b[f] || c[f] || e[f];
	    });
	    ["LEFT", "RIGHT"].forEach(b => {
	      [g[`${b}_ANALOG_HORIZONTAL_AXIS`], g[`${b}_ANALOG_VERTICAL_AXIS`]].forEach((c, e) => {
	        if ("number" !== typeof a[c]) {
	          if (0 === e || 2 === e) a[c] = a[g[`${b}_ANALOG_RIGHT`]] ? 1 : a[g[`${b}_ANALOG_LEFT`]] ? -1 : 0;
	          if (1 === e || 3 === e) a[c] = a[g[`${b}_ANALOG_UP`]] ? -1 : a[g[`${b}_ANALOG_DOWN`]] ? 1 : 0;
	        }
	      });
	    });
	    a.UP = a.DPAD_UP || a.LEFT_ANALOG_UP;
	    a.RIGHT = a.DPAD_RIGHT || a.LEFT_ANALOG_RIGHT;
	    a.DOWN = a.DPAD_DOWN || a.LEFT_ANALOG_DOWN;
	    a.LEFT = a.DPAD_LEFT || a.LEFT_ANALOG_LEFT;
	    Object.keys(a).forEach(b => {
	      if (void 0 === a[b] || "string" === typeof a[b]) a[b] = !1;
	    });
	    this.plugins.forEach(b => {
	      b.onGetState && (b = b.onGetState(a)) && (this.state = b);
	    });
	    return a;
	  }

	  onInputsChange(a, b) {
	    "string" === typeof a && (a = [a]);
	    this.inputChangeMap[a] = {
	      codes: a,
	      callback: b
	    };
	    this.cancelInputChangeListener || this._startInputChangeInterval();
	    return () => {
	      delete this.inputChangeMap[a];
	    };
	  }

	  _startInputChangeInterval() {
	    let a = setInterval(this._inputChangeIntervalHandler.bind(this), 16);

	    this.cancelInputChangeListener = () => clearInterval(a);
	  }

	  _inputChangeIntervalHandler() {
	    let a = this.getState(),
	        b = [];
	    Object.keys(a).forEach(c => {
	      a[c] !== this.inputChangeOldState[c] && b.push(c);
	    });
	    Object.keys(this.inputChangeMap).forEach(c => {
	      this.inputChangeMap[c].codes.some(a => b.includes(a)) && this.inputChangeMap[c].callback(a);
	    });
	    this.inputChangeOldState = a;
	  }

	}

	let A = new z();
	var ResponsiveGamepad = A;

	// Example Plugin for the libarary
	function ExamplePlugin() {
	  return {
	    onAddPlugin: () => console.log('ExamplePlugin addPlugin()'),
	    onGetState: CurrentResponsiveGamepadState => {
	      CurrentResponsiveGamepadState.EXAMPLE_PLUGIN_ADDED = true;
	      return CurrentResponsiveGamepadState;
	    }
	  };
	}

	class ResponsiveGamepadState extends Component {
	  componentDidMount() {
	    // Continually raf and re-render
	    const update = () => {
	      requestAnimationFrame(() => {
	        this.setState({});
	        update();
	      });
	    };

	    update();
	  }

	  toggle() {
	    if (ResponsiveGamepad.isEnabled()) {
	      ResponsiveGamepad.disable();
	    } else {
	      ResponsiveGamepad.enable();
	    }
	  }

	  render() {
	    return h("div", {
	      class: "responsive-gamepad-state"
	    }, h("h2", null, "Responsive Gamepad State:"), h("button", {
	      onClick: () => this.toggle()
	    }, "Toggle Enabled"), h("div", null, h("b", null, "Enabled:"), " ", ResponsiveGamepad.isEnabled().toString()), h("pre", null, JSON.stringify(ResponsiveGamepad.getState(), null, 2)));
	  }

	}

	function _extends() {
	  _extends = Object.assign || function (target) {
	    for (var i = 1; i < arguments.length; i++) {
	      var source = arguments[i];

	      for (var key in source) {
	        if (Object.prototype.hasOwnProperty.call(source, key)) {
	          target[key] = source[key];
	        }
	      }
	    }

	    return target;
	  };

	  return _extends.apply(this, arguments);
	}

	function _objectWithoutPropertiesLoose(source, excluded) {
	  if (source == null) return {};
	  var target = {};
	  var sourceKeys = Object.keys(source);
	  var key, i;

	  for (i = 0; i < sourceKeys.length; i++) {
	    key = sourceKeys[i];
	    if (excluded.indexOf(key) >= 0) continue;
	    target[key] = source[key];
	  }

	  return target;
	}

	function _objectWithoutProperties(source, excluded) {
	  if (source == null) return {};

	  var target = _objectWithoutPropertiesLoose(source, excluded);

	  var key, i;

	  if (Object.getOwnPropertySymbols) {
	    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

	    for (i = 0; i < sourceSymbolKeys.length; i++) {
	      key = sourceSymbolKeys[i];
	      if (excluded.indexOf(key) >= 0) continue;
	      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
	      target[key] = source[key];
	    }
	  }

	  return target;
	}

	class CircleButton extends Component {
	  render(_ref) {
	    let {
	      text
	    } = _ref,
	        props = _objectWithoutProperties(_ref, ["text"]);

	    return h("svg", _extends({}, props, {
	      height: "24",
	      viewBox: "0 0 24 24",
	      width: "24",
	      xmlns: "http://www.w3.org/2000/svg"
	    }), h("path", {
	      d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
	    }), h("path", {
	      d: "M0 0h24v24H0z",
	      fill: "none"
	    }), h("text", {
	      x: "9.75",
	      y: "14"
	    }, text));
	  }

	}

	class DashButton extends Component {
	  render(_ref) {
	    let {
	      text
	    } = _ref,
	        props = _objectWithoutProperties(_ref, ["text"]);

	    return h("svg", _extends({}, props, {
	      height: "24",
	      viewBox: "0 0 24 24",
	      width: "24",
	      xmlns: "http://www.w3.org/2000/svg"
	    }), h("path", {
	      d: "M19 13H5v-2h14v2z"
	    }), h("path", {
	      d: "M0 0h24v24H0z",
	      fill: "none"
	    }), h("text", {
	      x: "3.5",
	      y: "18.5"
	    }, text));
	  }

	}

	class Dpad extends Component {
	  render(_ref) {
	    let props = _extends({}, _ref);

	    return h("svg", _extends({}, props, {
	      height: "24",
	      viewBox: "0 0 24 24",
	      width: "24",
	      xmlns: "http://www.w3.org/2000/svg"
	    }), h("path", {
	      d: "M0 0h24v24H0z",
	      fill: "none"
	    }), h("path", {
	      d: "M15 7.5V2H9v5.5l3 3 3-3zM7.5 9H2v6h5.5l3-3-3-3zM9 16.5V22h6v-5.5l-3-3-3 3zM16.5 9l-3 3 3 3H22V9h-5.5z"
	    }));
	  }

	}

	class Analog extends Component {
	  render(_ref) {
	    let props = _extends({}, _ref);

	    return h("div", _extends({}, props, {
	      class: "analog-container"
	    }), h("svg", {
	      class: "analog-stick",
	      height: "24",
	      viewBox: "0 0 24 24",
	      width: "24",
	      xmlns: "http://www.w3.org/2000/svg"
	    }, h("circle", {
	      cx: "12",
	      cy: "12",
	      r: "6"
	    })), h("svg", {
	      class: "analog-background",
	      height: "24",
	      viewBox: "0 0 24 24",
	      width: "24",
	      xmlns: "http://www.w3.org/2000/svg"
	    }, h("circle", {
	      cx: "12",
	      cy: "12",
	      r: "12"
	    })));
	  }

	}

	class Touchpad extends Component {
	  componentDidMount() {
	    ResponsiveGamepad.TouchInput.addLeftAnalogInput(document.querySelector('#left-analog .analog-stick'));
	    ResponsiveGamepad.TouchInput.addDpadInput(document.getElementById('dpad'), {
	      allowMultipleDirections: true
	    });
	    ResponsiveGamepad.TouchInput.addButtonInput(document.getElementById('select'), ResponsiveGamepad.RESPONSIVE_GAMEPAD_INPUTS.SELECT);
	    ResponsiveGamepad.TouchInput.addButtonInput(document.getElementById('start'), ResponsiveGamepad.RESPONSIVE_GAMEPAD_INPUTS.START);
	    ResponsiveGamepad.TouchInput.addButtonInput(document.getElementById('a-button'), ResponsiveGamepad.RESPONSIVE_GAMEPAD_INPUTS.A);
	    ResponsiveGamepad.TouchInput.addButtonInput(document.getElementById('b-button'), ResponsiveGamepad.RESPONSIVE_GAMEPAD_INPUTS.B);
	  }

	  render() {
	    return h("div", {
	      class: "touchpad"
	    }, h(Analog, {
	      id: "left-analog"
	    }), h(Dpad, {
	      id: "dpad"
	    }), h(DashButton, {
	      id: "select",
	      text: "Select"
	    }), h(DashButton, {
	      id: "start",
	      text: "Start"
	    }), h(CircleButton, {
	      id: "a-button",
	      text: "A"
	    }), h(CircleButton, {
	      id: "b-button",
	      text: "B"
	    }));
	  }

	}

	function styleInject(css, ref) {
	  if ( ref === void 0 ) ref = {};
	  var insertAt = ref.insertAt;

	  if (!css || typeof document === 'undefined') { return; }

	  var head = document.head || document.getElementsByTagName('head')[0];
	  var style = document.createElement('style');
	  style.type = 'text/css';

	  if (insertAt === 'top') {
	    if (head.firstChild) {
	      head.insertBefore(style, head.firstChild);
	    } else {
	      head.appendChild(style);
	    }
	  } else {
	    head.appendChild(style);
	  }

	  if (style.styleSheet) {
	    style.styleSheet.cssText = css;
	  } else {
	    style.appendChild(document.createTextNode(css));
	  }
	}

	var css = "/* Import our CSS Libs */\n/*! normalize.css v5.0.0 | MIT License | github.com/necolas/normalize.css */\n/**\n * 1. Change the default font family in all browsers (opinionated).\n * 2. Correct the line height in all browsers.\n * 3. Prevent adjustments of font size after orientation changes in\n *    IE on Windows Phone and in iOS.\n */\n/* Document\n   ========================================================================== */\nhtml {\n  font-family: sans-serif; /* 1 */\n  line-height: 1.15; /* 2 */\n  -ms-text-size-adjust: 100%; /* 3 */\n  -webkit-text-size-adjust: 100%; /* 3 */\n}\n/* Sections\n   ========================================================================== */\n/**\n * Remove the margin in all browsers (opinionated).\n */\nbody {\n  margin: 0;\n}\n/**\n * Add the correct display in IE 9-.\n */\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block;\n}\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n/* Grouping content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in IE.\n */\nfigcaption,\nfigure,\nmain { /* 1 */\n  display: block;\n}\n/**\n * Add the correct margin in IE 8.\n */\nfigure {\n  margin: 1em 40px;\n}\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\npre {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n/* Text-level semantics\n   ========================================================================== */\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\na {\n  background-color: transparent; /* 1 */\n  -webkit-text-decoration-skip: objects; /* 2 */\n}\n/**\n * Remove the outline on focused links when they are also active or hovered\n * in all browsers (opinionated).\n */\na:active,\na:hover {\n  outline-width: 0;\n}\n/**\n * 1. Remove the bottom border in Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\nb,\nstrong {\n  font-weight: inherit;\n}\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\nb,\nstrong {\n  font-weight: bolder;\n}\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n/**\n * Add the correct font style in Android 4.3-.\n */\ndfn {\n  font-style: italic;\n}\n/**\n * Add the correct background and color in IE 9-.\n */\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n/**\n * Add the correct font size in all browsers.\n */\nsmall {\n  font-size: 80%;\n}\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\nsub {\n  bottom: -0.25em;\n}\nsup {\n  top: -0.5em;\n}\n/* Embedded content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\naudio,\nvideo {\n  display: inline-block;\n}\n/**\n * Add the correct display in iOS 4-7.\n */\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n/**\n * Remove the border on images inside links in IE 10-.\n */\nimg {\n  border-style: none;\n}\n/**\n * Hide the overflow in IE.\n */\nsvg:not(:root) {\n  overflow: hidden;\n}\n/* Forms\n   ========================================================================== */\n/**\n * 1. Change the font styles in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\nbutton,\ninput { /* 1 */\n  overflow: visible;\n}\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\nbutton,\nhtml [type=\"button\"], /* 1 */\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button; /* 2 */\n}\n/**\n * Remove the inner border and padding in Firefox.\n */\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n/**\n * Restore the focus styles unset by the previous rule.\n */\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n/**\n * Change the border, margin, and padding in all browsers (opinionated).\n */\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n/**\n * 1. Add the correct display in IE 9-.\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\nprogress {\n  display: inline-block; /* 1 */\n  vertical-align: baseline; /* 2 */\n}\n/**\n * Remove the default vertical scrollbar in IE.\n */\ntextarea {\n  overflow: auto;\n}\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.\n */\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n/* Interactive\n   ========================================================================== */\n/*\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n */\ndetails, /* 1 */\nmenu {\n  display: block;\n}\n/*\n * Add the correct display in all browsers.\n */\nsummary {\n  display: list-item;\n}\n/* Scripting\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\ncanvas {\n  display: inline-block;\n}\n/**\n * Add the correct display in IE.\n */\ntemplate {\n  display: none;\n}\n/* Hidden\n   ========================================================================== */\n/**\n * Add the correct display in IE 10-.\n */\n[hidden] {\n  display: none;\n}\n/* Sakura.css v1.0.0\n * ================\n * Minimal css theme.\n * Project: https://github.com/oxalorg/sakura\n */\n/* Body */\nhtml {\n  font-size: 62.5%;\n  font-family: serif; }\nbody {\n  font-size: 1.8rem;\n  line-height: 1.618;\n  max-width: 38em;\n  margin: auto;\n  color: #4a4a4a;\n  background-color: #f9f9f9;\n  padding: 13px; }\n@media (max-width: 684px) {\n  body {\n    font-size: 1.53rem; } }\n@media (max-width: 382px) {\n  body {\n    font-size: 1.35rem; } }\nh1, h2, h3, h4, h5, h6 {\n  line-height: 1.1;\n  font-family: Verdana, Geneva, sans-serif;\n  font-weight: 700;\n  overflow-wrap: break-word;\n  word-wrap: break-word;\n  -ms-word-break: break-all;\n  word-break: break-word;\n  -ms-hyphens: auto;\n  -moz-hyphens: auto;\n  -webkit-hyphens: auto;\n  hyphens: auto; }\nh1 {\n  font-size: 2.35em; }\nh2 {\n  font-size: 2em; }\nh3 {\n  font-size: 1.75em; }\nh4 {\n  font-size: 1.5em; }\nh5 {\n  font-size: 1.25em; }\nh6 {\n  font-size: 1em; }\nsmall, sub, sup {\n  font-size: 75%; }\nhr {\n  border-color: #2c8898; }\na {\n  text-decoration: none;\n  color: #2c8898; }\na:hover {\n    color: #982c61;\n    border-bottom: 2px solid #4a4a4a; }\nul {\n  padding-left: 1.4em; }\nli {\n  margin-bottom: 0.4em; }\nblockquote {\n  font-style: italic;\n  margin-left: 1.5em;\n  padding-left: 1em;\n  border-left: 3px solid #2c8898; }\nimg {\n  max-width: 100%; }\n/* Pre and Code */\npre {\n  background-color: #f1f1f1;\n  display: block;\n  padding: 1em;\n  overflow-x: auto; }\ncode {\n  font-size: 0.9em;\n  padding: 0 0.5em;\n  background-color: #f1f1f1;\n  white-space: pre-wrap; }\npre > code {\n  padding: 0;\n  background-color: transparent;\n  white-space: pre; }\n/* Tables */\ntable {\n  text-align: justify;\n  width: 100%;\n  border-collapse: collapse; }\ntd, th {\n  padding: 0.5em;\n  border-bottom: 1px solid #f1f1f1; }\n/* Buttons, forms and input */\ninput, textarea {\n  border: 1px solid #4a4a4a; }\ninput:focus, textarea:focus {\n    border: 1px solid #2c8898; }\ntextarea {\n  width: 100%; }\n.button, button, input[type=\"submit\"], input[type=\"reset\"], input[type=\"button\"] {\n  display: inline-block;\n  padding: 5px 10px;\n  text-align: center;\n  text-decoration: none;\n  white-space: nowrap;\n  background-color: #2c8898;\n  color: #f9f9f9;\n  border-radius: 1px;\n  border: 1px solid #2c8898;\n  cursor: pointer;\n  box-sizing: border-box; }\n.button[disabled], button[disabled], input[type=\"submit\"][disabled], input[type=\"reset\"][disabled], input[type=\"button\"][disabled] {\n    cursor: default;\n    opacity: .5; }\n.button:focus, .button:hover, button:focus, button:hover, input[type=\"submit\"]:focus, input[type=\"submit\"]:hover, input[type=\"reset\"]:focus, input[type=\"reset\"]:hover, input[type=\"button\"]:focus, input[type=\"button\"]:hover {\n    background-color: #982c61;\n    border-color: #982c61;\n    color: #f9f9f9;\n    outline: 0; }\ntextarea, select, input[type] {\n  color: #4a4a4a;\n  padding: 6px 10px;\n  /* The 6px vertically centers text on FF, ignored by Webkit */\n  margin-bottom: 10px;\n  background-color: #f1f1f1;\n  border: 1px solid #f1f1f1;\n  border-radius: 4px;\n  box-shadow: none;\n  box-sizing: border-box; }\ntextarea:focus, select:focus, input[type]:focus {\n    border: 1px solid #2c8898;\n    outline: 0; }\nlabel, legend, fieldset {\n  display: block;\n  margin-bottom: .5rem;\n  font-weight: 600; }\n/* Touchpad */\n.touchpad-spacing {\n  height: 20vh;\n}\n.touchpad {\n\tposition: fixed;\n\tbottom: 0;\n\tleft: 0;\n\tdisplay: flex;\n\talign-items: flex-end;\n\twidth: 100%;\n\theight: 100%;\n\tpointer-events: none;\n  user-select: none;\n}\n.touchpad svg, .touchpad .analog-container {\n\twidth: 50%;\n\theight: 20%;\n\tpointer-events: auto;\n\n  background-color: rgba(0,0,0,0.5);\n  fill: #FAFAFA;\n}\n.touchpad .active {\n  fill: #3ba184;\n}\n.touchpad svg text {\n  font-size: 6px\n}\n.analog-container {\n  position: relative;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.analog-container svg {\n  background-color: transparent;\n  width: 100%;\n  height: 100%;\n\n}\n.analog-background {\n  opacity: 0.5;\n  position: absolute;\n  top: 0px;\n  left: 0px;\n}\n.analog-stick {\n  z-index: 100;\n  width: 68px !important;\n  height: 68px !important;\n}\n\n";
	styleInject(css);

	ResponsiveGamepad.onInputsChange(ResponsiveGamepad.RESPONSIVE_GAMEPAD_INPUTS.SELECT, state => {
	  console.log('demo: onInputsChange SELECT! State:', state);
	});

	class ResponsiveGamepadDemo extends Component {
	  componentDidMount() {
	    ResponsiveGamepad.addPlugin(ExamplePlugin());
	    ResponsiveGamepad.enable();
	  }

	  render() {
	    return h("div", null, h("h1", null, "Responsive Gamepad Demo"), h("a", {
	      href: "https://github.com/torch2424/responsive-gamepad",
	      target: "_blank"
	    }, "Fork me on Github"), h("div", null, h("b", null, "Version"), ": ", ResponsiveGamepad.getVersion()), h("div", {
	      class: "description"
	    }, "This is the example demo for responsive-gamepad. Feel free to test this demo with:", h("ul", null, h("li", null, "Keyboard"), h("li", null, "Gamepad (Feel free to plug one into USB)"), h("li", null, "Touchpad (See the floating fixed element at the bottom of the screen)")), "Scroll down to see the current state, learn about the api, and test some specific scenarios!"), h(ResponsiveGamepadState, null), h("div", {
	      class: "prevent-default"
	    }, h("h2", null, "Prevent Default (Keyboard Only)"), h("p", null, "I am very tall to show off `event.preventDefault()`. E.g arrow keys wont scroll if in the keymap. But typing will work on input type form fields! Also, keyboard shortcuts will also still work (Refresh the page with Ctrl+R or Cmd+R)"), h("label", null, "input:", h("input", {
	      type: "text"
	    })), h("br", null), h("label", null, "textarea:", h("textarea", null)), h("br", null), h("button", {
	      onClick: () => {
	        console.log('I was the button your pressed a key on.');
	      }
	    }, "Press space on me, and check your logs!"), h("br", null), h("select", null, h("option", {
	      value: "use"
	    }, "use arrow keys once selected"), h("option", {
	      value: "arrow"
	    }, "use arrow keys once selected"), h("option", {
	      value: "keys"
	    }, "use arrow keys once selected"))), h("div", {
	      class: "api"
	    }, h("h2", null, "API"), h("div", null, "To learn more about the Responsive Gamepad API, please see the ", h("a", {
	      href: "https://github.com/torch2424/responsive-gamepad",
	      target: "_blank"
	    }, "Github Repo"), "."), h("h3", null, "Plugins"), h("div", null, "Something worth noting on the demo is the ability to add plugins. Plugins allow for modifying the output from getState(). Which can allow for functionality like:", h("ul", null, h("li", null, "Merging multiple inputs into one"), h("li", null, "Adding additional keys for something like another input source."), h("li", null, "Etc...")), "Please see the Responsive Gamepad State above, and notice the key \"EXAMPLE_PLUGIN_ADDED\".")), h("div", {
	      class: "touchpad-spacing"
	    }), h(Touchpad, null));
	  }

	}

	render(h(ResponsiveGamepadDemo, null), document.getElementById('root'));

}());
