
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function exclude_internal_props(props) {
        const result = {};
        for (const k in props)
            if (k[0] !== '$')
                result[k] = props[k];
        return result;
    }
    function null_to_empty(value) {
        return value == null ? '' : value;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function set_style(node, key, value, important) {
        if (value === null) {
            node.style.removeProperty(key);
        }
        else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function afterUpdate(fn) {
        get_current_component().$$.after_update.push(fn);
    }
    function onDestroy(fn) {
        get_current_component().$$.on_destroy.push(fn);
    }
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail, { cancelable = false } = {}) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail, { cancelable });
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
                return !event.defaultPrevented;
            }
            return true;
        };
    }
    // TODO figure out if we still want to support
    // shorthand events, or if we want to implement
    // a real bubbling mechanism
    function bubble(component, event) {
        const callbacks = component.$$.callbacks[event.type];
        if (callbacks) {
            // @ts-ignore
            callbacks.slice().forEach(fn => fn.call(this, event));
        }
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function tick() {
        schedule_update();
        return resolved_promise;
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function add_flush_callback(fn) {
        flush_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
    }

    function bind(component, name, callback) {
        const index = component.$$.props[name];
        if (index !== undefined) {
            component.$$.bound[index] = callback;
            callback(component.$$.ctx[index]);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.48.0' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /**
     * @typedef {Object} WrappedComponent Object returned by the `wrap` method
     * @property {SvelteComponent} component - Component to load (this is always asynchronous)
     * @property {RoutePrecondition[]} [conditions] - Route pre-conditions to validate
     * @property {Object} [props] - Optional dictionary of static props
     * @property {Object} [userData] - Optional user data dictionary
     * @property {bool} _sveltesparouter - Internal flag; always set to true
     */

    /**
     * @callback AsyncSvelteComponent
     * @returns {Promise<SvelteComponent>} Returns a Promise that resolves with a Svelte component
     */

    /**
     * @callback RoutePrecondition
     * @param {RouteDetail} detail - Route detail object
     * @returns {boolean|Promise<boolean>} If the callback returns a false-y value, it's interpreted as the precondition failed, so it aborts loading the component (and won't process other pre-condition callbacks)
     */

    /**
     * @typedef {Object} WrapOptions Options object for the call to `wrap`
     * @property {SvelteComponent} [component] - Svelte component to load (this is incompatible with `asyncComponent`)
     * @property {AsyncSvelteComponent} [asyncComponent] - Function that returns a Promise that fulfills with a Svelte component (e.g. `{asyncComponent: () => import('Foo.svelte')}`)
     * @property {SvelteComponent} [loadingComponent] - Svelte component to be displayed while the async route is loading (as a placeholder); when unset or false-y, no component is shown while component
     * @property {object} [loadingParams] - Optional dictionary passed to the `loadingComponent` component as params (for an exported prop called `params`)
     * @property {object} [userData] - Optional object that will be passed to events such as `routeLoading`, `routeLoaded`, `conditionsFailed`
     * @property {object} [props] - Optional key-value dictionary of static props that will be passed to the component. The props are expanded with {...props}, so the key in the dictionary becomes the name of the prop.
     * @property {RoutePrecondition[]|RoutePrecondition} [conditions] - Route pre-conditions to add, which will be executed in order
     */

    /**
     * Wraps a component to enable multiple capabilities:
     * 1. Using dynamically-imported component, with (e.g. `{asyncComponent: () => import('Foo.svelte')}`), which also allows bundlers to do code-splitting.
     * 2. Adding route pre-conditions (e.g. `{conditions: [...]}`)
     * 3. Adding static props that are passed to the component
     * 4. Adding custom userData, which is passed to route events (e.g. route loaded events) or to route pre-conditions (e.g. `{userData: {foo: 'bar}}`)
     * 
     * @param {WrapOptions} args - Arguments object
     * @returns {WrappedComponent} Wrapped component
     */
    function wrap$1(args) {
        if (!args) {
            throw Error('Parameter args is required')
        }

        // We need to have one and only one of component and asyncComponent
        // This does a "XNOR"
        if (!args.component == !args.asyncComponent) {
            throw Error('One and only one of component and asyncComponent is required')
        }

        // If the component is not async, wrap it into a function returning a Promise
        if (args.component) {
            args.asyncComponent = () => Promise.resolve(args.component);
        }

        // Parameter asyncComponent and each item of conditions must be functions
        if (typeof args.asyncComponent != 'function') {
            throw Error('Parameter asyncComponent must be a function')
        }
        if (args.conditions) {
            // Ensure it's an array
            if (!Array.isArray(args.conditions)) {
                args.conditions = [args.conditions];
            }
            for (let i = 0; i < args.conditions.length; i++) {
                if (!args.conditions[i] || typeof args.conditions[i] != 'function') {
                    throw Error('Invalid parameter conditions[' + i + ']')
                }
            }
        }

        // Check if we have a placeholder component
        if (args.loadingComponent) {
            args.asyncComponent.loading = args.loadingComponent;
            args.asyncComponent.loadingParams = args.loadingParams || undefined;
        }

        // Returns an object that contains all the functions to execute too
        // The _sveltesparouter flag is to confirm the object was created by this router
        const obj = {
            component: args.asyncComponent,
            userData: args.userData,
            conditions: (args.conditions && args.conditions.length) ? args.conditions : undefined,
            props: (args.props && Object.keys(args.props).length) ? args.props : {},
            _sveltesparouter: true
        };

        return obj
    }

    const subscriber_queue = [];
    /**
     * Creates a `Readable` store that allows reading by subscription.
     * @param value initial value
     * @param {StartStopNotifier}start start and stop notifications for subscriptions
     */
    function readable(value, start) {
        return {
            subscribe: writable(value, start).subscribe
        };
    }
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }
    function derived(stores, fn, initial_value) {
        const single = !Array.isArray(stores);
        const stores_array = single
            ? [stores]
            : stores;
        const auto = fn.length < 2;
        return readable(initial_value, (set) => {
            let inited = false;
            const values = [];
            let pending = 0;
            let cleanup = noop;
            const sync = () => {
                if (pending) {
                    return;
                }
                cleanup();
                const result = fn(single ? values[0] : values, set);
                if (auto) {
                    set(result);
                }
                else {
                    cleanup = is_function(result) ? result : noop;
                }
            };
            const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
                values[i] = value;
                pending &= ~(1 << i);
                if (inited) {
                    sync();
                }
            }, () => {
                pending |= (1 << i);
            }));
            inited = true;
            sync();
            return function stop() {
                run_all(unsubscribers);
                cleanup();
            };
        });
    }

    function parse(str, loose) {
    	if (str instanceof RegExp) return { keys:false, pattern:str };
    	var c, o, tmp, ext, keys=[], pattern='', arr = str.split('/');
    	arr[0] || arr.shift();

    	while (tmp = arr.shift()) {
    		c = tmp[0];
    		if (c === '*') {
    			keys.push('wild');
    			pattern += '/(.*)';
    		} else if (c === ':') {
    			o = tmp.indexOf('?', 1);
    			ext = tmp.indexOf('.', 1);
    			keys.push( tmp.substring(1, !!~o ? o : !!~ext ? ext : tmp.length) );
    			pattern += !!~o && !~ext ? '(?:/([^/]+?))?' : '/([^/]+?)';
    			if (!!~ext) pattern += (!!~o ? '?' : '') + '\\' + tmp.substring(ext);
    		} else {
    			pattern += '/' + tmp;
    		}
    	}

    	return {
    		keys: keys,
    		pattern: new RegExp('^' + pattern + (loose ? '(?=$|\/)' : '\/?$'), 'i')
    	};
    }

    /* node_modules\svelte-spa-router\Router.svelte generated by Svelte v3.48.0 */

    const { Error: Error_1, Object: Object_1, console: console_1$1 } = globals;

    // (251:0) {:else}
    function create_else_block(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	const switch_instance_spread_levels = [/*props*/ ctx[2]];
    	var switch_value = /*component*/ ctx[0];

    	function switch_props(ctx) {
    		let switch_instance_props = {};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props());
    		switch_instance.$on("routeEvent", /*routeEvent_handler_1*/ ctx[7]);
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = (dirty & /*props*/ 4)
    			? get_spread_update(switch_instance_spread_levels, [get_spread_object(/*props*/ ctx[2])])
    			: {};

    			if (switch_value !== (switch_value = /*component*/ ctx[0])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props());
    					switch_instance.$on("routeEvent", /*routeEvent_handler_1*/ ctx[7]);
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(251:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (244:0) {#if componentParams}
    function create_if_block(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	const switch_instance_spread_levels = [{ params: /*componentParams*/ ctx[1] }, /*props*/ ctx[2]];
    	var switch_value = /*component*/ ctx[0];

    	function switch_props(ctx) {
    		let switch_instance_props = {};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props());
    		switch_instance.$on("routeEvent", /*routeEvent_handler*/ ctx[6]);
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = (dirty & /*componentParams, props*/ 6)
    			? get_spread_update(switch_instance_spread_levels, [
    					dirty & /*componentParams*/ 2 && { params: /*componentParams*/ ctx[1] },
    					dirty & /*props*/ 4 && get_spread_object(/*props*/ ctx[2])
    				])
    			: {};

    			if (switch_value !== (switch_value = /*component*/ ctx[0])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props());
    					switch_instance.$on("routeEvent", /*routeEvent_handler*/ ctx[6]);
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(244:0) {#if componentParams}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$i(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block, create_else_block];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*componentParams*/ ctx[1]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error_1("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$i.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function wrap(component, userData, ...conditions) {
    	// Use the new wrap method and show a deprecation warning
    	// eslint-disable-next-line no-console
    	console.warn('Method `wrap` from `svelte-spa-router` is deprecated and will be removed in a future version. Please use `svelte-spa-router/wrap` instead. See http://bit.ly/svelte-spa-router-upgrading');

    	return wrap$1({ component, userData, conditions });
    }

    /**
     * @typedef {Object} Location
     * @property {string} location - Location (page/view), for example `/book`
     * @property {string} [querystring] - Querystring from the hash, as a string not parsed
     */
    /**
     * Returns the current location from the hash.
     *
     * @returns {Location} Location object
     * @private
     */
    function getLocation() {
    	const hashPosition = window.location.href.indexOf('#/');

    	let location = hashPosition > -1
    	? window.location.href.substr(hashPosition + 1)
    	: '/';

    	// Check if there's a querystring
    	const qsPosition = location.indexOf('?');

    	let querystring = '';

    	if (qsPosition > -1) {
    		querystring = location.substr(qsPosition + 1);
    		location = location.substr(0, qsPosition);
    	}

    	return { location, querystring };
    }

    const loc = readable(null, // eslint-disable-next-line prefer-arrow-callback
    function start(set) {
    	set(getLocation());

    	const update = () => {
    		set(getLocation());
    	};

    	window.addEventListener('hashchange', update, false);

    	return function stop() {
    		window.removeEventListener('hashchange', update, false);
    	};
    });

    const location = derived(loc, $loc => $loc.location);
    const querystring = derived(loc, $loc => $loc.querystring);
    const params = writable(undefined);

    async function push(location) {
    	if (!location || location.length < 1 || location.charAt(0) != '/' && location.indexOf('#/') !== 0) {
    		throw Error('Invalid parameter location');
    	}

    	// Execute this code when the current call stack is complete
    	await tick();

    	// Note: this will include scroll state in history even when restoreScrollState is false
    	history.replaceState(
    		{
    			...history.state,
    			__svelte_spa_router_scrollX: window.scrollX,
    			__svelte_spa_router_scrollY: window.scrollY
    		},
    		undefined,
    		undefined
    	);

    	window.location.hash = (location.charAt(0) == '#' ? '' : '#') + location;
    }

    async function pop() {
    	// Execute this code when the current call stack is complete
    	await tick();

    	window.history.back();
    }

    async function replace(location) {
    	if (!location || location.length < 1 || location.charAt(0) != '/' && location.indexOf('#/') !== 0) {
    		throw Error('Invalid parameter location');
    	}

    	// Execute this code when the current call stack is complete
    	await tick();

    	const dest = (location.charAt(0) == '#' ? '' : '#') + location;

    	try {
    		const newState = { ...history.state };
    		delete newState['__svelte_spa_router_scrollX'];
    		delete newState['__svelte_spa_router_scrollY'];
    		window.history.replaceState(newState, undefined, dest);
    	} catch(e) {
    		// eslint-disable-next-line no-console
    		console.warn('Caught exception while replacing the current page. If you\'re running this in the Svelte REPL, please note that the `replace` method might not work in this environment.');
    	}

    	// The method above doesn't trigger the hashchange event, so let's do that manually
    	window.dispatchEvent(new Event('hashchange'));
    }

    function link(node, opts) {
    	opts = linkOpts(opts);

    	// Only apply to <a> tags
    	if (!node || !node.tagName || node.tagName.toLowerCase() != 'a') {
    		throw Error('Action "link" can only be used with <a> tags');
    	}

    	updateLink(node, opts);

    	return {
    		update(updated) {
    			updated = linkOpts(updated);
    			updateLink(node, updated);
    		}
    	};
    }

    // Internal function used by the link function
    function updateLink(node, opts) {
    	let href = opts.href || node.getAttribute('href');

    	// Destination must start with '/' or '#/'
    	if (href && href.charAt(0) == '/') {
    		// Add # to the href attribute
    		href = '#' + href;
    	} else if (!href || href.length < 2 || href.slice(0, 2) != '#/') {
    		throw Error('Invalid value for "href" attribute: ' + href);
    	}

    	node.setAttribute('href', href);

    	node.addEventListener('click', event => {
    		// Prevent default anchor onclick behaviour
    		event.preventDefault();

    		if (!opts.disabled) {
    			scrollstateHistoryHandler(event.currentTarget.getAttribute('href'));
    		}
    	});
    }

    // Internal function that ensures the argument of the link action is always an object
    function linkOpts(val) {
    	if (val && typeof val == 'string') {
    		return { href: val };
    	} else {
    		return val || {};
    	}
    }

    /**
     * The handler attached to an anchor tag responsible for updating the
     * current history state with the current scroll state
     *
     * @param {string} href - Destination
     */
    function scrollstateHistoryHandler(href) {
    	// Setting the url (3rd arg) to href will break clicking for reasons, so don't try to do that
    	history.replaceState(
    		{
    			...history.state,
    			__svelte_spa_router_scrollX: window.scrollX,
    			__svelte_spa_router_scrollY: window.scrollY
    		},
    		undefined,
    		undefined
    	);

    	// This will force an update as desired, but this time our scroll state will be attached
    	window.location.hash = href;
    }

    function instance$i($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Router', slots, []);
    	let { routes = {} } = $$props;
    	let { prefix = '' } = $$props;
    	let { restoreScrollState = false } = $$props;

    	/**
     * Container for a route: path, component
     */
    	class RouteItem {
    		/**
     * Initializes the object and creates a regular expression from the path, using regexparam.
     *
     * @param {string} path - Path to the route (must start with '/' or '*')
     * @param {SvelteComponent|WrappedComponent} component - Svelte component for the route, optionally wrapped
     */
    		constructor(path, component) {
    			if (!component || typeof component != 'function' && (typeof component != 'object' || component._sveltesparouter !== true)) {
    				throw Error('Invalid component object');
    			}

    			// Path must be a regular or expression, or a string starting with '/' or '*'
    			if (!path || typeof path == 'string' && (path.length < 1 || path.charAt(0) != '/' && path.charAt(0) != '*') || typeof path == 'object' && !(path instanceof RegExp)) {
    				throw Error('Invalid value for "path" argument - strings must start with / or *');
    			}

    			const { pattern, keys } = parse(path);
    			this.path = path;

    			// Check if the component is wrapped and we have conditions
    			if (typeof component == 'object' && component._sveltesparouter === true) {
    				this.component = component.component;
    				this.conditions = component.conditions || [];
    				this.userData = component.userData;
    				this.props = component.props || {};
    			} else {
    				// Convert the component to a function that returns a Promise, to normalize it
    				this.component = () => Promise.resolve(component);

    				this.conditions = [];
    				this.props = {};
    			}

    			this._pattern = pattern;
    			this._keys = keys;
    		}

    		/**
     * Checks if `path` matches the current route.
     * If there's a match, will return the list of parameters from the URL (if any).
     * In case of no match, the method will return `null`.
     *
     * @param {string} path - Path to test
     * @returns {null|Object.<string, string>} List of paramters from the URL if there's a match, or `null` otherwise.
     */
    		match(path) {
    			// If there's a prefix, check if it matches the start of the path.
    			// If not, bail early, else remove it before we run the matching.
    			if (prefix) {
    				if (typeof prefix == 'string') {
    					if (path.startsWith(prefix)) {
    						path = path.substr(prefix.length) || '/';
    					} else {
    						return null;
    					}
    				} else if (prefix instanceof RegExp) {
    					const match = path.match(prefix);

    					if (match && match[0]) {
    						path = path.substr(match[0].length) || '/';
    					} else {
    						return null;
    					}
    				}
    			}

    			// Check if the pattern matches
    			const matches = this._pattern.exec(path);

    			if (matches === null) {
    				return null;
    			}

    			// If the input was a regular expression, this._keys would be false, so return matches as is
    			if (this._keys === false) {
    				return matches;
    			}

    			const out = {};
    			let i = 0;

    			while (i < this._keys.length) {
    				// In the match parameters, URL-decode all values
    				try {
    					out[this._keys[i]] = decodeURIComponent(matches[i + 1] || '') || null;
    				} catch(e) {
    					out[this._keys[i]] = null;
    				}

    				i++;
    			}

    			return out;
    		}

    		/**
     * Dictionary with route details passed to the pre-conditions functions, as well as the `routeLoading`, `routeLoaded` and `conditionsFailed` events
     * @typedef {Object} RouteDetail
     * @property {string|RegExp} route - Route matched as defined in the route definition (could be a string or a reguar expression object)
     * @property {string} location - Location path
     * @property {string} querystring - Querystring from the hash
     * @property {object} [userData] - Custom data passed by the user
     * @property {SvelteComponent} [component] - Svelte component (only in `routeLoaded` events)
     * @property {string} [name] - Name of the Svelte component (only in `routeLoaded` events)
     */
    		/**
     * Executes all conditions (if any) to control whether the route can be shown. Conditions are executed in the order they are defined, and if a condition fails, the following ones aren't executed.
     * 
     * @param {RouteDetail} detail - Route detail
     * @returns {boolean} Returns true if all the conditions succeeded
     */
    		async checkConditions(detail) {
    			for (let i = 0; i < this.conditions.length; i++) {
    				if (!await this.conditions[i](detail)) {
    					return false;
    				}
    			}

    			return true;
    		}
    	}

    	// Set up all routes
    	const routesList = [];

    	if (routes instanceof Map) {
    		// If it's a map, iterate on it right away
    		routes.forEach((route, path) => {
    			routesList.push(new RouteItem(path, route));
    		});
    	} else {
    		// We have an object, so iterate on its own properties
    		Object.keys(routes).forEach(path => {
    			routesList.push(new RouteItem(path, routes[path]));
    		});
    	}

    	// Props for the component to render
    	let component = null;

    	let componentParams = null;
    	let props = {};

    	// Event dispatcher from Svelte
    	const dispatch = createEventDispatcher();

    	// Just like dispatch, but executes on the next iteration of the event loop
    	async function dispatchNextTick(name, detail) {
    		// Execute this code when the current call stack is complete
    		await tick();

    		dispatch(name, detail);
    	}

    	// If this is set, then that means we have popped into this var the state of our last scroll position
    	let previousScrollState = null;

    	let popStateChanged = null;

    	if (restoreScrollState) {
    		popStateChanged = event => {
    			// If this event was from our history.replaceState, event.state will contain
    			// our scroll history. Otherwise, event.state will be null (like on forward
    			// navigation)
    			if (event.state && event.state.__svelte_spa_router_scrollY) {
    				previousScrollState = event.state;
    			} else {
    				previousScrollState = null;
    			}
    		};

    		// This is removed in the destroy() invocation below
    		window.addEventListener('popstate', popStateChanged);

    		afterUpdate(() => {
    			// If this exists, then this is a back navigation: restore the scroll position
    			if (previousScrollState) {
    				window.scrollTo(previousScrollState.__svelte_spa_router_scrollX, previousScrollState.__svelte_spa_router_scrollY);
    			} else {
    				// Otherwise this is a forward navigation: scroll to top
    				window.scrollTo(0, 0);
    			}
    		});
    	}

    	// Always have the latest value of loc
    	let lastLoc = null;

    	// Current object of the component loaded
    	let componentObj = null;

    	// Handle hash change events
    	// Listen to changes in the $loc store and update the page
    	// Do not use the $: syntax because it gets triggered by too many things
    	const unsubscribeLoc = loc.subscribe(async newLoc => {
    		lastLoc = newLoc;

    		// Find a route matching the location
    		let i = 0;

    		while (i < routesList.length) {
    			const match = routesList[i].match(newLoc.location);

    			if (!match) {
    				i++;
    				continue;
    			}

    			const detail = {
    				route: routesList[i].path,
    				location: newLoc.location,
    				querystring: newLoc.querystring,
    				userData: routesList[i].userData,
    				params: match && typeof match == 'object' && Object.keys(match).length
    				? match
    				: null
    			};

    			// Check if the route can be loaded - if all conditions succeed
    			if (!await routesList[i].checkConditions(detail)) {
    				// Don't display anything
    				$$invalidate(0, component = null);

    				componentObj = null;

    				// Trigger an event to notify the user, then exit
    				dispatchNextTick('conditionsFailed', detail);

    				return;
    			}

    			// Trigger an event to alert that we're loading the route
    			// We need to clone the object on every event invocation so we don't risk the object to be modified in the next tick
    			dispatchNextTick('routeLoading', Object.assign({}, detail));

    			// If there's a component to show while we're loading the route, display it
    			const obj = routesList[i].component;

    			// Do not replace the component if we're loading the same one as before, to avoid the route being unmounted and re-mounted
    			if (componentObj != obj) {
    				if (obj.loading) {
    					$$invalidate(0, component = obj.loading);
    					componentObj = obj;
    					$$invalidate(1, componentParams = obj.loadingParams);
    					$$invalidate(2, props = {});

    					// Trigger the routeLoaded event for the loading component
    					// Create a copy of detail so we don't modify the object for the dynamic route (and the dynamic route doesn't modify our object too)
    					dispatchNextTick('routeLoaded', Object.assign({}, detail, {
    						component,
    						name: component.name,
    						params: componentParams
    					}));
    				} else {
    					$$invalidate(0, component = null);
    					componentObj = null;
    				}

    				// Invoke the Promise
    				const loaded = await obj();

    				// Now that we're here, after the promise resolved, check if we still want this component, as the user might have navigated to another page in the meanwhile
    				if (newLoc != lastLoc) {
    					// Don't update the component, just exit
    					return;
    				}

    				// If there is a "default" property, which is used by async routes, then pick that
    				$$invalidate(0, component = loaded && loaded.default || loaded);

    				componentObj = obj;
    			}

    			// Set componentParams only if we have a match, to avoid a warning similar to `<Component> was created with unknown prop 'params'`
    			// Of course, this assumes that developers always add a "params" prop when they are expecting parameters
    			if (match && typeof match == 'object' && Object.keys(match).length) {
    				$$invalidate(1, componentParams = match);
    			} else {
    				$$invalidate(1, componentParams = null);
    			}

    			// Set static props, if any
    			$$invalidate(2, props = routesList[i].props);

    			// Dispatch the routeLoaded event then exit
    			// We need to clone the object on every event invocation so we don't risk the object to be modified in the next tick
    			dispatchNextTick('routeLoaded', Object.assign({}, detail, {
    				component,
    				name: component.name,
    				params: componentParams
    			})).then(() => {
    				params.set(componentParams);
    			});

    			return;
    		}

    		// If we're still here, there was no match, so show the empty component
    		$$invalidate(0, component = null);

    		componentObj = null;
    		params.set(undefined);
    	});

    	onDestroy(() => {
    		unsubscribeLoc();
    		popStateChanged && window.removeEventListener('popstate', popStateChanged);
    	});

    	const writable_props = ['routes', 'prefix', 'restoreScrollState'];

    	Object_1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$1.warn(`<Router> was created with unknown prop '${key}'`);
    	});

    	function routeEvent_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function routeEvent_handler_1(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$props => {
    		if ('routes' in $$props) $$invalidate(3, routes = $$props.routes);
    		if ('prefix' in $$props) $$invalidate(4, prefix = $$props.prefix);
    		if ('restoreScrollState' in $$props) $$invalidate(5, restoreScrollState = $$props.restoreScrollState);
    	};

    	$$self.$capture_state = () => ({
    		readable,
    		writable,
    		derived,
    		tick,
    		_wrap: wrap$1,
    		wrap,
    		getLocation,
    		loc,
    		location,
    		querystring,
    		params,
    		push,
    		pop,
    		replace,
    		link,
    		updateLink,
    		linkOpts,
    		scrollstateHistoryHandler,
    		onDestroy,
    		createEventDispatcher,
    		afterUpdate,
    		parse,
    		routes,
    		prefix,
    		restoreScrollState,
    		RouteItem,
    		routesList,
    		component,
    		componentParams,
    		props,
    		dispatch,
    		dispatchNextTick,
    		previousScrollState,
    		popStateChanged,
    		lastLoc,
    		componentObj,
    		unsubscribeLoc
    	});

    	$$self.$inject_state = $$props => {
    		if ('routes' in $$props) $$invalidate(3, routes = $$props.routes);
    		if ('prefix' in $$props) $$invalidate(4, prefix = $$props.prefix);
    		if ('restoreScrollState' in $$props) $$invalidate(5, restoreScrollState = $$props.restoreScrollState);
    		if ('component' in $$props) $$invalidate(0, component = $$props.component);
    		if ('componentParams' in $$props) $$invalidate(1, componentParams = $$props.componentParams);
    		if ('props' in $$props) $$invalidate(2, props = $$props.props);
    		if ('previousScrollState' in $$props) previousScrollState = $$props.previousScrollState;
    		if ('popStateChanged' in $$props) popStateChanged = $$props.popStateChanged;
    		if ('lastLoc' in $$props) lastLoc = $$props.lastLoc;
    		if ('componentObj' in $$props) componentObj = $$props.componentObj;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*restoreScrollState*/ 32) {
    			// Update history.scrollRestoration depending on restoreScrollState
    			history.scrollRestoration = restoreScrollState ? 'manual' : 'auto';
    		}
    	};

    	return [
    		component,
    		componentParams,
    		props,
    		routes,
    		prefix,
    		restoreScrollState,
    		routeEvent_handler,
    		routeEvent_handler_1
    	];
    }

    class Router$1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$i, create_fragment$i, safe_not_equal, {
    			routes: 3,
    			prefix: 4,
    			restoreScrollState: 5
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Router",
    			options,
    			id: create_fragment$i.name
    		});
    	}

    	get routes() {
    		throw new Error_1("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set routes(value) {
    		throw new Error_1("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get prefix() {
    		throw new Error_1("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set prefix(value) {
    		throw new Error_1("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get restoreScrollState() {
    		throw new Error_1("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set restoreScrollState(value) {
    		throw new Error_1("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\SizeTester.svelte generated by Svelte v3.48.0 */

    const file$g = "src\\SizeTester.svelte";

    function create_fragment$h(ctx) {
    	let div4;
    	let div0;
    	let input;
    	let t0;
    	let button0;
    	let t2;
    	let button1;
    	let t4;
    	let button2;
    	let t6;
    	let button3;
    	let t8;
    	let div1;
    	let button4;
    	let t10;
    	let button5;
    	let t12;
    	let button6;
    	let t14;
    	let div3;
    	let div2;
    	let iframe;
    	let iframe_src_value;
    	let div2_class_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div4 = element("div");
    			div0 = element("div");
    			input = element("input");
    			t0 = space();
    			button0 = element("button");
    			button0.textContent = "Landing Page";
    			t2 = space();
    			button1 = element("button");
    			button1.textContent = "Responsive Styling";
    			t4 = space();
    			button2 = element("button");
    			button2.textContent = "Email";
    			t6 = space();
    			button3 = element("button");
    			button3.textContent = "Grid";
    			t8 = space();
    			div1 = element("div");
    			button4 = element("button");
    			button4.textContent = "Mobile - Portrait";
    			t10 = space();
    			button5 = element("button");
    			button5.textContent = "Tablet";
    			t12 = space();
    			button6 = element("button");
    			button6.textContent = "Desktop";
    			t14 = space();
    			div3 = element("div");
    			div2 = element("div");
    			iframe = element("iframe");
    			attr_dev(input, "id", "page");
    			attr_dev(input, "class", "input svelte-kzs5bi");
    			attr_dev(input, "type", "text");
    			add_location(input, file$g, 60, 3, 847);
    			attr_dev(button0, "type", "submit");
    			attr_dev(button0, "class", "button is-info is-long");
    			add_location(button0, file$g, 61, 3, 913);
    			attr_dev(button1, "type", "submit");
    			attr_dev(button1, "class", "button is-info is-long");
    			add_location(button1, file$g, 62, 3, 1008);
    			attr_dev(button2, "type", "submit");
    			attr_dev(button2, "class", "button is-info is-long");
    			add_location(button2, file$g, 63, 3, 1109);
    			attr_dev(button3, "type", "submit");
    			attr_dev(button3, "class", "button is-info is-long");
    			add_location(button3, file$g, 64, 3, 1197);
    			attr_dev(div0, "class", "field svelte-kzs5bi");
    			add_location(div0, file$g, 59, 2, 824);
    			attr_dev(button4, "type", "submit");
    			attr_dev(button4, "class", "button is-info is-long");
    			add_location(button4, file$g, 67, 3, 1317);
    			attr_dev(button5, "type", "submit");
    			attr_dev(button5, "class", "button is-info is-long");
    			add_location(button5, file$g, 68, 3, 1425);
    			attr_dev(button6, "type", "submit");
    			attr_dev(button6, "class", "button is-info is-long");
    			add_location(button6, file$g, 69, 3, 1520);
    			attr_dev(div1, "class", "buttons svelte-kzs5bi");
    			add_location(div1, file$g, 66, 2, 1292);
    			if (!src_url_equal(iframe.src, iframe_src_value = /*url*/ ctx[5])) attr_dev(iframe, "src", iframe_src_value);
    			attr_dev(iframe, "class", "frame svelte-kzs5bi");
    			attr_dev(iframe, "title", "desktop");
    			set_style(iframe, "width", /*width*/ ctx[0] + "px");
    			set_style(iframe, "height", /*height*/ ctx[2] + "px");
    			add_location(iframe, file$g, 73, 3, 1730);
    			attr_dev(div2, "class", div2_class_value = "" + (null_to_empty(/*type*/ ctx[4]) + " svelte-kzs5bi"));
    			set_style(div2, "margin", "auto");
    			set_style(div2, "width", /*width2*/ ctx[1] + "px");
    			set_style(div2, "height", /*height2*/ ctx[3] + "px");
    			add_location(div2, file$g, 72, 3, 1649);
    			attr_dev(div3, "class", "tester svelte-kzs5bi");
    			add_location(div3, file$g, 71, 2, 1625);
    			add_location(div4, file$g, 57, 1, 813);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div4, anchor);
    			append_dev(div4, div0);
    			append_dev(div0, input);
    			set_input_value(input, /*url*/ ctx[5]);
    			append_dev(div0, t0);
    			append_dev(div0, button0);
    			append_dev(div0, t2);
    			append_dev(div0, button1);
    			append_dev(div0, t4);
    			append_dev(div0, button2);
    			append_dev(div0, t6);
    			append_dev(div0, button3);
    			append_dev(div4, t8);
    			append_dev(div4, div1);
    			append_dev(div1, button4);
    			append_dev(div1, t10);
    			append_dev(div1, button5);
    			append_dev(div1, t12);
    			append_dev(div1, button6);
    			append_dev(div4, t14);
    			append_dev(div4, div3);
    			append_dev(div3, div2);
    			append_dev(div2, iframe);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "input", /*input_input_handler*/ ctx[13]),
    					listen_dev(button0, "click", /*ass1*/ ctx[9], false, false, false),
    					listen_dev(button1, "click", /*ass2*/ ctx[10], false, false, false),
    					listen_dev(button2, "click", /*ass3*/ ctx[11], false, false, false),
    					listen_dev(button3, "click", /*ass4*/ ctx[12], false, false, false),
    					listen_dev(button4, "click", /*set_portrait*/ ctx[7], false, false, false),
    					listen_dev(button5, "click", /*set_tablet*/ ctx[8], false, false, false),
    					listen_dev(button6, "click", /*set_desktop*/ ctx[6], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*url*/ 32 && input.value !== /*url*/ ctx[5]) {
    				set_input_value(input, /*url*/ ctx[5]);
    			}

    			if (dirty & /*url*/ 32 && !src_url_equal(iframe.src, iframe_src_value = /*url*/ ctx[5])) {
    				attr_dev(iframe, "src", iframe_src_value);
    			}

    			if (dirty & /*width*/ 1) {
    				set_style(iframe, "width", /*width*/ ctx[0] + "px");
    			}

    			if (dirty & /*height*/ 4) {
    				set_style(iframe, "height", /*height*/ ctx[2] + "px");
    			}

    			if (dirty & /*type*/ 16 && div2_class_value !== (div2_class_value = "" + (null_to_empty(/*type*/ ctx[4]) + " svelte-kzs5bi"))) {
    				attr_dev(div2, "class", div2_class_value);
    			}

    			if (dirty & /*width2*/ 2) {
    				set_style(div2, "width", /*width2*/ ctx[1] + "px");
    			}

    			if (dirty & /*height2*/ 8) {
    				set_style(div2, "height", /*height2*/ ctx[3] + "px");
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div4);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$h.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$h($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SizeTester', slots, []);
    	let width = 370;
    	let width2 = width + 30;
    	let height = 720;
    	let height2 = height + 210;
    	let type = "portrait";
    	let url = "/plain/media.html";

    	function set_desktop() {
    		$$invalidate(0, width = 1510);
    		$$invalidate(1, width2 = width);
    		$$invalidate(2, height = 850);
    		$$invalidate(3, height2 = height);
    		$$invalidate(4, type = "desktop");
    	}

    	function set_portrait() {
    		$$invalidate(0, width = 370);
    		$$invalidate(1, width2 = width + 30);
    		$$invalidate(2, height = 720);
    		$$invalidate(3, height2 = height + 210);
    		$$invalidate(4, type = "portrait");
    	}

    	function set_landscape() {
    		$$invalidate(0, width = 730);
    		$$invalidate(1, width2 = 730 + 220);
    		$$invalidate(2, height = 360);
    		$$invalidate(3, height2 = 360 + 25);
    		$$invalidate(4, type = "landscape");
    	}

    	function set_tablet() {
    		$$invalidate(0, width = 768);
    		$$invalidate(1, width2 = width);
    		$$invalidate(2, height = 850);
    		$$invalidate(3, height2 = height);
    		$$invalidate(4, type = "tablet");
    	}

    	function ass1() {
    		$$invalidate(5, url = "/");
    	}

    	function ass2() {
    		$$invalidate(5, url = "/plain/media.html");
    	}

    	function ass3() {
    		$$invalidate(5, url = "/email.html");
    	}

    	function ass4() {
    		$$invalidate(5, url = "/#/grid");
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<SizeTester> was created with unknown prop '${key}'`);
    	});

    	function input_input_handler() {
    		url = this.value;
    		$$invalidate(5, url);
    	}

    	$$self.$capture_state = () => ({
    		width,
    		width2,
    		height,
    		height2,
    		type,
    		url,
    		set_desktop,
    		set_portrait,
    		set_landscape,
    		set_tablet,
    		ass1,
    		ass2,
    		ass3,
    		ass4
    	});

    	$$self.$inject_state = $$props => {
    		if ('width' in $$props) $$invalidate(0, width = $$props.width);
    		if ('width2' in $$props) $$invalidate(1, width2 = $$props.width2);
    		if ('height' in $$props) $$invalidate(2, height = $$props.height);
    		if ('height2' in $$props) $$invalidate(3, height2 = $$props.height2);
    		if ('type' in $$props) $$invalidate(4, type = $$props.type);
    		if ('url' in $$props) $$invalidate(5, url = $$props.url);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		width,
    		width2,
    		height,
    		height2,
    		type,
    		url,
    		set_desktop,
    		set_portrait,
    		set_tablet,
    		ass1,
    		ass2,
    		ass3,
    		ass4,
    		input_input_handler
    	];
    }

    class SizeTester extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$h, create_fragment$h, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SizeTester",
    			options,
    			id: create_fragment$h.name
    		});
    	}
    }

    /* src\Prototypes\Card.svelte generated by Svelte v3.48.0 */

    const file$f = "src\\Prototypes\\Card.svelte";

    function create_fragment$g(ctx) {
    	let div5;
    	let div0;
    	let figure;
    	let img_1;
    	let img_1_src_value;
    	let t0;
    	let div4;
    	let div2;
    	let div1;
    	let p;
    	let t1;
    	let t2;
    	let div3;
    	let t3;

    	const block = {
    		c: function create() {
    			div5 = element("div");
    			div0 = element("div");
    			figure = element("figure");
    			img_1 = element("img");
    			t0 = space();
    			div4 = element("div");
    			div2 = element("div");
    			div1 = element("div");
    			p = element("p");
    			t1 = text(/*title*/ ctx[1]);
    			t2 = space();
    			div3 = element("div");
    			t3 = text(/*desc*/ ctx[2]);
    			if (!src_url_equal(img_1.src, img_1_src_value = /*img*/ ctx[0])) attr_dev(img_1, "src", img_1_src_value);
    			attr_dev(img_1, "alt", /*title*/ ctx[1]);
    			add_location(img_1, file$f, 11, 6, 160);
    			attr_dev(figure, "class", "image is-4by3");
    			add_location(figure, file$f, 10, 4, 123);
    			attr_dev(div0, "class", "card-image");
    			add_location(div0, file$f, 9, 2, 94);
    			attr_dev(p, "class", "title is-4 svelte-honqdq");
    			add_location(p, file$f, 17, 8, 310);
    			attr_dev(div1, "class", "media-content");
    			add_location(div1, file$f, 16, 6, 274);
    			attr_dev(div2, "class", "media");
    			add_location(div2, file$f, 15, 4, 248);
    			attr_dev(div3, "class", "content");
    			add_location(div3, file$f, 21, 4, 373);
    			attr_dev(div4, "class", "card-content");
    			add_location(div4, file$f, 14, 2, 217);
    			attr_dev(div5, "class", "card svelte-honqdq");
    			add_location(div5, file$f, 8, 0, 73);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div5, anchor);
    			append_dev(div5, div0);
    			append_dev(div0, figure);
    			append_dev(figure, img_1);
    			append_dev(div5, t0);
    			append_dev(div5, div4);
    			append_dev(div4, div2);
    			append_dev(div2, div1);
    			append_dev(div1, p);
    			append_dev(p, t1);
    			append_dev(div4, t2);
    			append_dev(div4, div3);
    			append_dev(div3, t3);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*img*/ 1 && !src_url_equal(img_1.src, img_1_src_value = /*img*/ ctx[0])) {
    				attr_dev(img_1, "src", img_1_src_value);
    			}

    			if (dirty & /*title*/ 2) {
    				attr_dev(img_1, "alt", /*title*/ ctx[1]);
    			}

    			if (dirty & /*title*/ 2) set_data_dev(t1, /*title*/ ctx[1]);
    			if (dirty & /*desc*/ 4) set_data_dev(t3, /*desc*/ ctx[2]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div5);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$g.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$g($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Card', slots, []);
    	let { img } = $$props;
    	let { title } = $$props;
    	let { desc } = $$props;
    	const writable_props = ['img', 'title', 'desc'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Card> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('img' in $$props) $$invalidate(0, img = $$props.img);
    		if ('title' in $$props) $$invalidate(1, title = $$props.title);
    		if ('desc' in $$props) $$invalidate(2, desc = $$props.desc);
    	};

    	$$self.$capture_state = () => ({ img, title, desc });

    	$$self.$inject_state = $$props => {
    		if ('img' in $$props) $$invalidate(0, img = $$props.img);
    		if ('title' in $$props) $$invalidate(1, title = $$props.title);
    		if ('desc' in $$props) $$invalidate(2, desc = $$props.desc);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [img, title, desc];
    }

    class Card extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$g, create_fragment$g, safe_not_equal, { img: 0, title: 1, desc: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Card",
    			options,
    			id: create_fragment$g.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*img*/ ctx[0] === undefined && !('img' in props)) {
    			console.warn("<Card> was created without expected prop 'img'");
    		}

    		if (/*title*/ ctx[1] === undefined && !('title' in props)) {
    			console.warn("<Card> was created without expected prop 'title'");
    		}

    		if (/*desc*/ ctx[2] === undefined && !('desc' in props)) {
    			console.warn("<Card> was created without expected prop 'desc'");
    		}
    	}

    	get img() {
    		throw new Error("<Card>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set img(value) {
    		throw new Error("<Card>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<Card>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Card>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get desc() {
    		throw new Error("<Card>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set desc(value) {
    		throw new Error("<Card>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\Landing.svelte generated by Svelte v3.48.0 */
    const file$e = "src\\Landing.svelte";

    function create_fragment$f(ctx) {
    	let div4;
    	let div0;
    	let figure;
    	let img;
    	let img_src_value;
    	let t0;
    	let div3;
    	let div2;
    	let h1;
    	let t2;
    	let div1;
    	let t4;
    	let section0;
    	let p0;
    	let t6;
    	let hr;
    	let t7;
    	let p1;
    	let t9;
    	let div11;
    	let div7;
    	let div5;
    	let h2;
    	let t11;
    	let div6;
    	let a0;
    	let t13;
    	let div10;
    	let div8;
    	let a1;
    	let card0;
    	let t14;
    	let div9;
    	let a2;
    	let card1;
    	let t15;
    	let section1;
    	let div16;
    	let h30;
    	let t17;
    	let div12;
    	let span0;
    	let t19;
    	let span1;
    	let t21;
    	let span2;
    	let t23;
    	let span3;
    	let t25;
    	let span4;
    	let t27;
    	let h31;
    	let t29;
    	let div13;
    	let span5;
    	let t31;
    	let span6;
    	let t33;
    	let span7;
    	let t35;
    	let span8;
    	let t37;
    	let span9;
    	let t39;
    	let h32;
    	let t41;
    	let div14;
    	let span10;
    	let t43;
    	let span11;
    	let t45;
    	let span12;
    	let t47;
    	let span13;
    	let t49;
    	let span14;
    	let t51;
    	let span15;
    	let t53;
    	let h33;
    	let t55;
    	let div15;
    	let span16;
    	let t57;
    	let span17;
    	let t59;
    	let span18;
    	let t61;
    	let span19;
    	let t63;
    	let span20;
    	let current;

    	card0 = new Card({
    			props: {
    				title: "Netflix Surfing",
    				img: "/img/surf.png",
    				desc: "What habits can we borrow from Netflix to make watching its content more passive. In this design I expore adding a random or surf mode to Netflix."
    			},
    			$$inline: true
    		});

    	card1 = new Card({
    			props: {
    				title: "Election Mart",
    				img: "/img/votenow.jpg",
    				desc: "Voting in person and by mail is inefficient. Also, it is difficult to know what is on the ballot, and be informed about all the choices. This design explores what an election site might look like."
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div4 = element("div");
    			div0 = element("div");
    			figure = element("figure");
    			img = element("img");
    			t0 = space();
    			div3 = element("div");
    			div2 = element("div");
    			h1 = element("h1");
    			h1.textContent = "Juston Points";
    			t2 = space();
    			div1 = element("div");
    			div1.textContent = "A person";
    			t4 = space();
    			section0 = element("section");
    			p0 = element("p");
    			p0.textContent = "Hello, my name is Juston. I do not know what to say here, because I like letting my actions to do the talking. However, if I need to say something to get your attention, then I am awesome.";
    			t6 = space();
    			hr = element("hr");
    			t7 = space();
    			p1 = element("p");
    			p1.textContent = "I enjoy projects where I can make an ineffcient task more effcient, and help the user acheive thier goal.";
    			t9 = space();
    			div11 = element("div");
    			div7 = element("div");
    			div5 = element("div");
    			h2 = element("h2");
    			h2.textContent = "Sample Projects";
    			t11 = space();
    			div6 = element("div");
    			a0 = element("a");
    			a0.textContent = "View More Projects";
    			t13 = space();
    			div10 = element("div");
    			div8 = element("div");
    			a1 = element("a");
    			create_component(card0.$$.fragment);
    			t14 = space();
    			div9 = element("div");
    			a2 = element("a");
    			create_component(card1.$$.fragment);
    			t15 = space();
    			section1 = element("section");
    			div16 = element("div");
    			h30 = element("h3");
    			h30.textContent = "Quality Assurance";
    			t17 = space();
    			div12 = element("div");
    			span0 = element("span");
    			span0.textContent = "Test Cases";
    			t19 = space();
    			span1 = element("span");
    			span1.textContent = "Selenium";
    			t21 = space();
    			span2 = element("span");
    			span2.textContent = "Puppeteer";
    			t23 = space();
    			span3 = element("span");
    			span3.textContent = "Cucumber";
    			t25 = space();
    			span4 = element("span");
    			span4.textContent = "Jira";
    			t27 = space();
    			h31 = element("h3");
    			h31.textContent = "User Experience";
    			t29 = space();
    			div13 = element("div");
    			span5 = element("span");
    			span5.textContent = "Cognitive Psychology";
    			t31 = space();
    			span6 = element("span");
    			span6.textContent = "Axure";
    			t33 = space();
    			span7 = element("span");
    			span7.textContent = "Wireframes";
    			t35 = space();
    			span8 = element("span");
    			span8.textContent = "Mockups";
    			t37 = space();
    			span9 = element("span");
    			span9.textContent = "Research Methods";
    			t39 = space();
    			h32 = element("h3");
    			h32.textContent = "User Interface";
    			t41 = space();
    			div14 = element("div");
    			span10 = element("span");
    			span10.textContent = "HTML";
    			t43 = space();
    			span11 = element("span");
    			span11.textContent = "CSS";
    			t45 = space();
    			span12 = element("span");
    			span12.textContent = "Javascript";
    			t47 = space();
    			span13 = element("span");
    			span13.textContent = "Svelete";
    			t49 = space();
    			span14 = element("span");
    			span14.textContent = "Feathers";
    			t51 = space();
    			span15 = element("span");
    			span15.textContent = "A-Frame";
    			t53 = space();
    			h33 = element("h3");
    			h33.textContent = "Backend";
    			t55 = space();
    			div15 = element("div");
    			span16 = element("span");
    			span16.textContent = "Node JS";
    			t57 = space();
    			span17 = element("span");
    			span17.textContent = "Loopback";
    			t59 = space();
    			span18 = element("span");
    			span18.textContent = "Sails";
    			t61 = space();
    			span19 = element("span");
    			span19.textContent = "Loopback";
    			t63 = space();
    			span20 = element("span");
    			span20.textContent = "Feathers";
    			attr_dev(img, "class", "is-rounded");
    			attr_dev(img, "alt", "Juston Points");
    			if (!src_url_equal(img.src, img_src_value = "/img/juston-hello.png")) attr_dev(img, "src", img_src_value);
    			add_location(img, file$e, 7, 16, 244);
    			attr_dev(figure, "class", "image is-128x128");
    			set_style(figure, "margin", "auto");
    			add_location(figure, file$e, 6, 12, 174);
    			attr_dev(div0, "class", "column is-2 is-success avatar svelte-ek7nr5");
    			add_location(div0, file$e, 5, 8, 117);
    			attr_dev(h1, "class", "title");
    			add_location(h1, file$e, 12, 12, 489);
    			attr_dev(div1, "class", "subtitle");
    			add_location(div1, file$e, 15, 12, 568);
    			attr_dev(div2, "class", "container");
    			set_style(div2, "margin", "auto");
    			set_style(div2, "text-align", "center");
    			add_location(div2, file$e, 11, 12, 415);
    			attr_dev(div3, "class", "column is-two-third header svelte-ek7nr5");
    			add_location(div3, file$e, 10, 8, 362);
    			attr_dev(div4, "class", "columns is-primary top svelte-ek7nr5");
    			add_location(div4, file$e, 4, 4, 72);
    			add_location(p0, file$e, 23, 8, 719);
    			add_location(hr, file$e, 24, 8, 923);
    			add_location(p1, file$e, 25, 8, 937);
    			attr_dev(section0, "class", "section svelte-ek7nr5");
    			add_location(section0, file$e, 22, 4, 685);
    			attr_dev(h2, "class", "title column");
    			add_location(h2, file$e, 30, 38, 1160);
    			attr_dev(div5, "class", "column is-10");
    			add_location(div5, file$e, 30, 12, 1134);
    			attr_dev(a0, "href", "#/prototypes");
    			attr_dev(a0, "class", "button svelte-ek7nr5");
    			attr_dev(a0, "title", "go to projects");
    			add_location(a0, file$e, 31, 32, 1244);
    			attr_dev(div6, "class", "column");
    			add_location(div6, file$e, 31, 12, 1224);
    			attr_dev(div7, "class", "columns");
    			add_location(div7, file$e, 29, 8, 1100);
    			attr_dev(a1, "href", "https://rdwkn5.axshare.com/");
    			attr_dev(a1, "target", "_blank");
    			attr_dev(a1, "desc", "Open Netflix project");
    			add_location(a1, file$e, 35, 12, 1461);
    			attr_dev(div8, "class", "column is-half is-centered");
    			add_location(div8, file$e, 34, 8, 1408);
    			attr_dev(a2, "href", "https://q23yz8.axshare.com/");
    			attr_dev(a2, "target", "_blank");
    			attr_dev(a2, "title", "open election mart project");
    			add_location(a2, file$e, 40, 12, 1844);
    			attr_dev(div9, "class", "column is-half");
    			add_location(div9, file$e, 39, 8, 1803);
    			attr_dev(div10, "class", "columns is-multiline is-centered");
    			add_location(div10, file$e, 33, 4, 1353);
    			attr_dev(div11, "class", "section svelte-ek7nr5");
    			add_location(div11, file$e, 28, 4, 1070);
    			attr_dev(h30, "class", "svelte-ek7nr5");
    			add_location(h30, file$e, 49, 8, 2335);
    			attr_dev(span0, "class", "tag svelte-ek7nr5");
    			add_location(span0, file$e, 51, 16, 2407);
    			attr_dev(span1, "class", "tag svelte-ek7nr5");
    			add_location(span1, file$e, 52, 16, 2459);
    			attr_dev(span2, "class", "tag svelte-ek7nr5");
    			add_location(span2, file$e, 53, 16, 2509);
    			attr_dev(span3, "class", "tag svelte-ek7nr5");
    			add_location(span3, file$e, 54, 16, 2560);
    			attr_dev(span4, "class", "tag svelte-ek7nr5");
    			add_location(span4, file$e, 55, 16, 2610);
    			attr_dev(div12, "class", "skills svelte-ek7nr5");
    			add_location(div12, file$e, 50, 8, 2370);
    			attr_dev(h31, "class", "svelte-ek7nr5");
    			add_location(h31, file$e, 57, 8, 2663);
    			attr_dev(span5, "class", "tag svelte-ek7nr5");
    			add_location(span5, file$e, 59, 16, 2735);
    			attr_dev(span6, "class", "tag svelte-ek7nr5");
    			add_location(span6, file$e, 60, 16, 2797);
    			attr_dev(span7, "class", "tag svelte-ek7nr5");
    			add_location(span7, file$e, 61, 16, 2844);
    			attr_dev(span8, "class", "tag svelte-ek7nr5");
    			add_location(span8, file$e, 62, 16, 2896);
    			attr_dev(span9, "class", "tag svelte-ek7nr5");
    			add_location(span9, file$e, 63, 16, 2945);
    			attr_dev(div13, "class", "skills svelte-ek7nr5");
    			add_location(div13, file$e, 58, 9, 2698);
    			attr_dev(h32, "class", "svelte-ek7nr5");
    			add_location(h32, file$e, 65, 8, 3010);
    			attr_dev(span10, "class", "tag svelte-ek7nr5");
    			add_location(span10, file$e, 67, 16, 3079);
    			attr_dev(span11, "class", "tag svelte-ek7nr5");
    			add_location(span11, file$e, 68, 16, 3125);
    			attr_dev(span12, "class", "tag svelte-ek7nr5");
    			add_location(span12, file$e, 69, 16, 3170);
    			attr_dev(span13, "class", "tag svelte-ek7nr5");
    			add_location(span13, file$e, 70, 16, 3222);
    			attr_dev(span14, "class", "tag svelte-ek7nr5");
    			add_location(span14, file$e, 71, 16, 3271);
    			attr_dev(span15, "class", "tag svelte-ek7nr5");
    			add_location(span15, file$e, 72, 16, 3321);
    			attr_dev(div14, "class", "skills svelte-ek7nr5");
    			add_location(div14, file$e, 66, 8, 3042);
    			attr_dev(h33, "class", "svelte-ek7nr5");
    			add_location(h33, file$e, 74, 12, 3381);
    			attr_dev(span16, "class", "tag svelte-ek7nr5");
    			add_location(span16, file$e, 76, 20, 3451);
    			attr_dev(span17, "class", "tag svelte-ek7nr5");
    			add_location(span17, file$e, 77, 20, 3505);
    			attr_dev(span18, "class", "tag svelte-ek7nr5");
    			add_location(span18, file$e, 78, 20, 3559);
    			attr_dev(span19, "class", "tag svelte-ek7nr5");
    			add_location(span19, file$e, 79, 20, 3610);
    			attr_dev(span20, "class", "tag svelte-ek7nr5");
    			add_location(span20, file$e, 80, 20, 3664);
    			attr_dev(div15, "class", "skills svelte-ek7nr5");
    			add_location(div15, file$e, 75, 12, 3410);
    			attr_dev(div16, "class", "container");
    			add_location(div16, file$e, 48, 8, 2303);
    			attr_dev(section1, "class", "section skill svelte-ek7nr5");
    			add_location(section1, file$e, 47, 4, 2263);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div4, anchor);
    			append_dev(div4, div0);
    			append_dev(div0, figure);
    			append_dev(figure, img);
    			append_dev(div4, t0);
    			append_dev(div4, div3);
    			append_dev(div3, div2);
    			append_dev(div2, h1);
    			append_dev(div2, t2);
    			append_dev(div2, div1);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, section0, anchor);
    			append_dev(section0, p0);
    			append_dev(section0, t6);
    			append_dev(section0, hr);
    			append_dev(section0, t7);
    			append_dev(section0, p1);
    			insert_dev(target, t9, anchor);
    			insert_dev(target, div11, anchor);
    			append_dev(div11, div7);
    			append_dev(div7, div5);
    			append_dev(div5, h2);
    			append_dev(div7, t11);
    			append_dev(div7, div6);
    			append_dev(div6, a0);
    			append_dev(div11, t13);
    			append_dev(div11, div10);
    			append_dev(div10, div8);
    			append_dev(div8, a1);
    			mount_component(card0, a1, null);
    			append_dev(div10, t14);
    			append_dev(div10, div9);
    			append_dev(div9, a2);
    			mount_component(card1, a2, null);
    			insert_dev(target, t15, anchor);
    			insert_dev(target, section1, anchor);
    			append_dev(section1, div16);
    			append_dev(div16, h30);
    			append_dev(div16, t17);
    			append_dev(div16, div12);
    			append_dev(div12, span0);
    			append_dev(div12, t19);
    			append_dev(div12, span1);
    			append_dev(div12, t21);
    			append_dev(div12, span2);
    			append_dev(div12, t23);
    			append_dev(div12, span3);
    			append_dev(div12, t25);
    			append_dev(div12, span4);
    			append_dev(div16, t27);
    			append_dev(div16, h31);
    			append_dev(div16, t29);
    			append_dev(div16, div13);
    			append_dev(div13, span5);
    			append_dev(div13, t31);
    			append_dev(div13, span6);
    			append_dev(div13, t33);
    			append_dev(div13, span7);
    			append_dev(div13, t35);
    			append_dev(div13, span8);
    			append_dev(div13, t37);
    			append_dev(div13, span9);
    			append_dev(div16, t39);
    			append_dev(div16, h32);
    			append_dev(div16, t41);
    			append_dev(div16, div14);
    			append_dev(div14, span10);
    			append_dev(div14, t43);
    			append_dev(div14, span11);
    			append_dev(div14, t45);
    			append_dev(div14, span12);
    			append_dev(div14, t47);
    			append_dev(div14, span13);
    			append_dev(div14, t49);
    			append_dev(div14, span14);
    			append_dev(div14, t51);
    			append_dev(div14, span15);
    			append_dev(div16, t53);
    			append_dev(div16, h33);
    			append_dev(div16, t55);
    			append_dev(div16, div15);
    			append_dev(div15, span16);
    			append_dev(div15, t57);
    			append_dev(div15, span17);
    			append_dev(div15, t59);
    			append_dev(div15, span18);
    			append_dev(div15, t61);
    			append_dev(div15, span19);
    			append_dev(div15, t63);
    			append_dev(div15, span20);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(card0.$$.fragment, local);
    			transition_in(card1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(card0.$$.fragment, local);
    			transition_out(card1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div4);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(section0);
    			if (detaching) detach_dev(t9);
    			if (detaching) detach_dev(div11);
    			destroy_component(card0);
    			destroy_component(card1);
    			if (detaching) detach_dev(t15);
    			if (detaching) detach_dev(section1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$f.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$f($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Landing', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Landing> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Card });
    	return [];
    }

    class Landing extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$f, create_fragment$f, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Landing",
    			options,
    			id: create_fragment$f.name
    		});
    	}
    }

    /* src\StyleGuide\Colorcard.svelte generated by Svelte v3.48.0 */

    const file$d = "src\\StyleGuide\\Colorcard.svelte";

    function create_fragment$e(ctx) {
    	let div;
    	let t0;
    	let t1;
    	let br0;
    	let t2;
    	let t3;
    	let t4;
    	let br1;
    	let t5;
    	let t6_value = hexToRGB(/*color*/ ctx[0]) + "";
    	let t6;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t0 = text(/*title*/ ctx[2]);
    			t1 = space();
    			br0 = element("br");
    			t2 = text("\n        HEX : ");
    			t3 = text(/*color*/ ctx[0]);
    			t4 = space();
    			br1 = element("br");
    			t5 = space();
    			t6 = text(t6_value);
    			add_location(br0, file$d, 27, 8, 641);
    			add_location(br1, file$d, 29, 8, 677);
    			attr_dev(div, "class", "color " + /*textcolor*/ ctx[1] + " svelte-txruxf");
    			set_style(div, "background-color", /*color*/ ctx[0]);
    			add_location(div, file$d, 25, 0, 551);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t0);
    			append_dev(div, t1);
    			append_dev(div, br0);
    			append_dev(div, t2);
    			append_dev(div, t3);
    			append_dev(div, t4);
    			append_dev(div, br1);
    			append_dev(div, t5);
    			append_dev(div, t6);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$e.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function hexToRGB(h) {
    	let r = 0, g = 0, b = 0;

    	// 3 digits
    	if (h.length == 4) {
    		r = "0x" + h[1] + h[1];
    		g = "0x" + h[2] + h[2];
    		b = "0x" + h[3] + h[3];
    	} else if (h.length == 7) {
    		r = "0x" + h[1] + h[2]; // 6 digits
    		g = "0x" + h[3] + h[4];
    		b = "0x" + h[5] + h[6];
    	}

    	return "rgb(" + +r + "," + +g + "," + +b + ")";
    }

    function instance$e($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Colorcard', slots, []);
    	let color = $$props.color || "grey";
    	let textcolor = $$props.text === "light" ? "light" : "dark";
    	let title = $$props.title || "";

    	$$self.$$set = $$new_props => {
    		$$invalidate(3, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    	};

    	$$self.$capture_state = () => ({ color, textcolor, title, hexToRGB });

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(3, $$props = assign(assign({}, $$props), $$new_props));
    		if ('color' in $$props) $$invalidate(0, color = $$new_props.color);
    		if ('textcolor' in $$props) $$invalidate(1, textcolor = $$new_props.textcolor);
    		if ('title' in $$props) $$invalidate(2, title = $$new_props.title);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$props = exclude_internal_props($$props);
    	return [color, textcolor, title];
    }

    class Colorcard extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$e, create_fragment$e, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Colorcard",
    			options,
    			id: create_fragment$e.name
    		});
    	}
    }

    /* src\StyleGuide\Logo.svelte generated by Svelte v3.48.0 */

    const file$c = "src\\StyleGuide\\Logo.svelte";

    function create_fragment$d(ctx) {
    	let div;
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text("JUSTON");
    			attr_dev(div, "class", "" + (null_to_empty(/*type*/ ctx[0]) + " svelte-fszxdf"));
    			add_location(div, file$c, 4, 0, 59);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$d.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$d($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Logo', slots, []);
    	let type = $$props.type || "dark";

    	$$self.$$set = $$new_props => {
    		$$invalidate(1, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    	};

    	$$self.$capture_state = () => ({ type });

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(1, $$props = assign(assign({}, $$props), $$new_props));
    		if ('type' in $$props) $$invalidate(0, type = $$new_props.type);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$props = exclude_internal_props($$props);
    	return [type];
    }

    class Logo extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$d, create_fragment$d, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Logo",
    			options,
    			id: create_fragment$d.name
    		});
    	}
    }

    /* src\StyleGuide\Avatar.svelte generated by Svelte v3.48.0 */

    const file$b = "src\\StyleGuide\\Avatar.svelte";

    function create_fragment$c(ctx) {
    	let div;
    	let figure;
    	let img;
    	let img_src_value;
    	let div_style_value;

    	const block = {
    		c: function create() {
    			div = element("div");
    			figure = element("figure");
    			img = element("img");
    			attr_dev(img, "class", "" + (null_to_empty(/*rounded*/ ctx[0]) + " svelte-yn2579"));
    			attr_dev(img, "alt", "Juston Points");
    			if (!src_url_equal(img.src, img_src_value = "/img/juston-hello.png")) attr_dev(img, "src", img_src_value);
    			add_location(img, file$b, 7, 8, 246);
    			attr_dev(figure, "class", "image");
    			set_style(figure, "margin", "auto");
    			add_location(figure, file$b, 6, 4, 195);
    			attr_dev(div, "class", "column is-2 is-success avatar dark svelte-yn2579");
    			attr_dev(div, "style", div_style_value = /*$$props*/ ctx[1].style);
    			add_location(div, file$b, 5, 1, 118);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, figure);
    			append_dev(figure, img);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*$$props*/ 2 && div_style_value !== (div_style_value = /*$$props*/ ctx[1].style)) {
    				attr_dev(div, "style", div_style_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$c.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$c($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Avatar', slots, []);
    	let type = $$props.type || "round";
    	let rounded = type === "round" ? "is-rounded" : null;

    	$$self.$$set = $$new_props => {
    		$$invalidate(1, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    	};

    	$$self.$capture_state = () => ({ type, rounded });

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(1, $$props = assign(assign({}, $$props), $$new_props));
    		if ('type' in $$props) type = $$new_props.type;
    		if ('rounded' in $$props) $$invalidate(0, rounded = $$new_props.rounded);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$props = exclude_internal_props($$props);
    	return [rounded, $$props];
    }

    class Avatar extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$c, create_fragment$c, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Avatar",
    			options,
    			id: create_fragment$c.name
    		});
    	}
    }

    /* src\StyleGuide\Font.svelte generated by Svelte v3.48.0 */

    const file$a = "src\\StyleGuide\\Font.svelte";

    function create_fragment$b(ctx) {
    	let div;
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text("the quick brown fox jumps over the lazy dog\n    THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG\n    1234567890 !@#$%^&*");
    			attr_dev(div, "class", "" + (null_to_empty(/*type*/ ctx[0]) + " svelte-13znilp"));
    			add_location(div, file$a, 4, 0, 59);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$b($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Font', slots, []);
    	let type = $$props.type || "dark";

    	$$self.$$set = $$new_props => {
    		$$invalidate(1, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    	};

    	$$self.$capture_state = () => ({ type });

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(1, $$props = assign(assign({}, $$props), $$new_props));
    		if ('type' in $$props) $$invalidate(0, type = $$new_props.type);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$props = exclude_internal_props($$props);
    	return [type];
    }

    class Font extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$b, create_fragment$b, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Font",
    			options,
    			id: create_fragment$b.name
    		});
    	}
    }

    /* src\StyleGuide\Style.svelte generated by Svelte v3.48.0 */
    const file$9 = "src\\StyleGuide\\Style.svelte";

    function create_fragment$a(ctx) {
    	let section;
    	let h1;
    	let t1;
    	let h20;
    	let t3;
    	let div2;
    	let div0;
    	let logo0;
    	let t4;
    	let div1;
    	let logo1;
    	let t5;
    	let h21;
    	let t7;
    	let div9;
    	let div3;
    	let colorcard0;
    	let t8;
    	let div4;
    	let colorcard1;
    	let t9;
    	let div5;
    	let colorcard2;
    	let t10;
    	let div6;
    	let colorcard3;
    	let t11;
    	let div7;
    	let colorcard4;
    	let t12;
    	let div8;
    	let colorcard5;
    	let t13;
    	let h22;
    	let t15;
    	let h3;
    	let t17;
    	let div12;
    	let div10;
    	let avatar0;
    	let t18;
    	let div11;
    	let avatar1;
    	let t19;
    	let h23;
    	let t21;
    	let div13;
    	let font0;
    	let t22;
    	let font1;
    	let current;
    	logo0 = new Logo({ $$inline: true });
    	logo1 = new Logo({ props: { type: "light" }, $$inline: true });

    	colorcard0 = new Colorcard({
    			props: {
    				class: "column",
    				color: "#325050",
    				text: "light",
    				title: "Dark Slate"
    			},
    			$$inline: true
    		});

    	colorcard1 = new Colorcard({
    			props: {
    				class: "column",
    				color: "#c8e6e6",
    				text: "dark",
    				title: "Slate"
    			},
    			$$inline: true
    		});

    	colorcard2 = new Colorcard({
    			props: {
    				class: "column",
    				color: "#f5ffff",
    				text: "dark",
    				title: "Light Slate"
    			},
    			$$inline: true
    		});

    	colorcard3 = new Colorcard({
    			props: {
    				class: "column",
    				color: "#b45032",
    				text: "light",
    				title: "Dark Orange"
    			},
    			$$inline: true
    		});

    	colorcard4 = new Colorcard({
    			props: {
    				class: "column",
    				color: "#dc8264",
    				text: "dark",
    				title: "Medium Orange"
    			},
    			$$inline: true
    		});

    	colorcard5 = new Colorcard({
    			props: {
    				class: "column",
    				color: "#fffafa",
    				text: "dark",
    				title: "Light Orange"
    			},
    			$$inline: true
    		});

    	avatar0 = new Avatar({ $$inline: true });

    	avatar1 = new Avatar({
    			props: { type: "square" },
    			$$inline: true
    		});

    	font0 = new Font({ $$inline: true });
    	font1 = new Font({ props: { type: "light" }, $$inline: true });

    	const block = {
    		c: function create() {
    			section = element("section");
    			h1 = element("h1");
    			h1.textContent = "Style Guide";
    			t1 = space();
    			h20 = element("h2");
    			h20.textContent = "Logo";
    			t3 = space();
    			div2 = element("div");
    			div0 = element("div");
    			create_component(logo0.$$.fragment);
    			t4 = space();
    			div1 = element("div");
    			create_component(logo1.$$.fragment);
    			t5 = space();
    			h21 = element("h2");
    			h21.textContent = "Primary Color Palette";
    			t7 = space();
    			div9 = element("div");
    			div3 = element("div");
    			create_component(colorcard0.$$.fragment);
    			t8 = space();
    			div4 = element("div");
    			create_component(colorcard1.$$.fragment);
    			t9 = space();
    			div5 = element("div");
    			create_component(colorcard2.$$.fragment);
    			t10 = space();
    			div6 = element("div");
    			create_component(colorcard3.$$.fragment);
    			t11 = space();
    			div7 = element("div");
    			create_component(colorcard4.$$.fragment);
    			t12 = space();
    			div8 = element("div");
    			create_component(colorcard5.$$.fragment);
    			t13 = space();
    			h22 = element("h2");
    			h22.textContent = "Brand Guide";
    			t15 = space();
    			h3 = element("h3");
    			h3.textContent = "Avatar";
    			t17 = space();
    			div12 = element("div");
    			div10 = element("div");
    			create_component(avatar0.$$.fragment);
    			t18 = space();
    			div11 = element("div");
    			create_component(avatar1.$$.fragment);
    			t19 = space();
    			h23 = element("h2");
    			h23.textContent = "Font: Verdana, Geneva, sans-serif";
    			t21 = space();
    			div13 = element("div");
    			create_component(font0.$$.fragment);
    			t22 = space();
    			create_component(font1.$$.fragment);
    			attr_dev(h1, "class", "title svelte-wthmi7");
    			add_location(h1, file$9, 8, 2, 212);
    			attr_dev(h20, "class", "title");
    			add_location(h20, file$9, 10, 0, 248);
    			attr_dev(div0, "class", "column is-full");
    			add_location(div0, file$9, 12, 4, 328);
    			attr_dev(div1, "class", "column is-full");
    			add_location(div1, file$9, 15, 4, 388);
    			attr_dev(div2, "class", "columns is-vcentered is-multiline");
    			add_location(div2, file$9, 11, 0, 276);
    			attr_dev(h21, "class", "title");
    			add_location(h21, file$9, 20, 0, 465);
    			attr_dev(div3, "class", "column is-one-third");
    			add_location(div3, file$9, 23, 4, 550);
    			attr_dev(div4, "class", "column is-one-third");
    			add_location(div4, file$9, 26, 4, 694);
    			attr_dev(div5, "class", "column is-one-third");
    			add_location(div5, file$9, 29, 5, 833);
    			attr_dev(div6, "class", "column is-one-third");
    			add_location(div6, file$9, 32, 4, 977);
    			attr_dev(div7, "class", "column is-one-third");
    			add_location(div7, file$9, 35, 4, 1122);
    			attr_dev(div8, "class", "column is-one-third");
    			add_location(div8, file$9, 38, 5, 1269);
    			attr_dev(div9, "class", "columns is-multiline");
    			add_location(div9, file$9, 22, 0, 511);
    			attr_dev(h22, "class", "title");
    			add_location(h22, file$9, 43, 0, 1418);
    			attr_dev(h3, "class", "title");
    			add_location(h3, file$9, 44, 0, 1453);
    			attr_dev(div10, "class", "column");
    			add_location(div10, file$9, 46, 4, 1526);
    			attr_dev(div11, "class", "column");
    			add_location(div11, file$9, 49, 4, 1580);
    			attr_dev(div12, "class", "columns is-multiline");
    			add_location(div12, file$9, 45, 4, 1487);
    			attr_dev(h23, "class", "title");
    			add_location(h23, file$9, 55, 4, 1657);
    			attr_dev(div13, "class", "container");
    			add_location(div13, file$9, 56, 4, 1718);
    			attr_dev(section, "class", "section");
    			add_location(section, file$9, 7, 2, 184);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, h1);
    			append_dev(section, t1);
    			append_dev(section, h20);
    			append_dev(section, t3);
    			append_dev(section, div2);
    			append_dev(div2, div0);
    			mount_component(logo0, div0, null);
    			append_dev(div2, t4);
    			append_dev(div2, div1);
    			mount_component(logo1, div1, null);
    			append_dev(section, t5);
    			append_dev(section, h21);
    			append_dev(section, t7);
    			append_dev(section, div9);
    			append_dev(div9, div3);
    			mount_component(colorcard0, div3, null);
    			append_dev(div9, t8);
    			append_dev(div9, div4);
    			mount_component(colorcard1, div4, null);
    			append_dev(div9, t9);
    			append_dev(div9, div5);
    			mount_component(colorcard2, div5, null);
    			append_dev(div9, t10);
    			append_dev(div9, div6);
    			mount_component(colorcard3, div6, null);
    			append_dev(div9, t11);
    			append_dev(div9, div7);
    			mount_component(colorcard4, div7, null);
    			append_dev(div9, t12);
    			append_dev(div9, div8);
    			mount_component(colorcard5, div8, null);
    			append_dev(section, t13);
    			append_dev(section, h22);
    			append_dev(section, t15);
    			append_dev(section, h3);
    			append_dev(section, t17);
    			append_dev(section, div12);
    			append_dev(div12, div10);
    			mount_component(avatar0, div10, null);
    			append_dev(div12, t18);
    			append_dev(div12, div11);
    			mount_component(avatar1, div11, null);
    			append_dev(section, t19);
    			append_dev(section, h23);
    			append_dev(section, t21);
    			append_dev(section, div13);
    			mount_component(font0, div13, null);
    			append_dev(div13, t22);
    			mount_component(font1, div13, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(logo0.$$.fragment, local);
    			transition_in(logo1.$$.fragment, local);
    			transition_in(colorcard0.$$.fragment, local);
    			transition_in(colorcard1.$$.fragment, local);
    			transition_in(colorcard2.$$.fragment, local);
    			transition_in(colorcard3.$$.fragment, local);
    			transition_in(colorcard4.$$.fragment, local);
    			transition_in(colorcard5.$$.fragment, local);
    			transition_in(avatar0.$$.fragment, local);
    			transition_in(avatar1.$$.fragment, local);
    			transition_in(font0.$$.fragment, local);
    			transition_in(font1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(logo0.$$.fragment, local);
    			transition_out(logo1.$$.fragment, local);
    			transition_out(colorcard0.$$.fragment, local);
    			transition_out(colorcard1.$$.fragment, local);
    			transition_out(colorcard2.$$.fragment, local);
    			transition_out(colorcard3.$$.fragment, local);
    			transition_out(colorcard4.$$.fragment, local);
    			transition_out(colorcard5.$$.fragment, local);
    			transition_out(avatar0.$$.fragment, local);
    			transition_out(avatar1.$$.fragment, local);
    			transition_out(font0.$$.fragment, local);
    			transition_out(font1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			destroy_component(logo0);
    			destroy_component(logo1);
    			destroy_component(colorcard0);
    			destroy_component(colorcard1);
    			destroy_component(colorcard2);
    			destroy_component(colorcard3);
    			destroy_component(colorcard4);
    			destroy_component(colorcard5);
    			destroy_component(avatar0);
    			destroy_component(avatar1);
    			destroy_component(font0);
    			destroy_component(font1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Style', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Style> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ ColorCard: Colorcard, Logo, Avatar, Font });
    	return [];
    }

    class Style extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Style",
    			options,
    			id: create_fragment$a.name
    		});
    	}
    }

    /* src\stylescape\StyleScape.svelte generated by Svelte v3.48.0 */
    const file$8 = "src\\stylescape\\StyleScape.svelte";

    function create_fragment$9(ctx) {
    	let h1;
    	let t1;
    	let div18;
    	let div17;
    	let div2;
    	let div0;
    	let figure0;
    	let img0;
    	let img0_src_value;
    	let t2;
    	let div1;
    	let logo0;
    	let t3;
    	let br;
    	let t4;
    	let logo1;
    	let t5;
    	let div13;
    	let div4;
    	let div3;
    	let t7;
    	let div12;
    	let div11;
    	let div5;
    	let figure1;
    	let img1;
    	let img1_src_value;
    	let t8;
    	let div6;
    	let figure2;
    	let img2;
    	let img2_src_value;
    	let t9;
    	let div7;
    	let figure3;
    	let img3;
    	let img3_src_value;
    	let t10;
    	let div8;
    	let figure4;
    	let img4;
    	let img4_src_value;
    	let t11;
    	let div9;
    	let figure5;
    	let img5;
    	let img5_src_value;
    	let t12;
    	let div10;
    	let figure6;
    	let img6;
    	let img6_src_value;
    	let t13;
    	let div16;
    	let div14;
    	let avatar;
    	let t14;
    	let div15;
    	let figure7;
    	let img7;
    	let img7_src_value;
    	let current;
    	logo0 = new Logo({ $$inline: true });
    	logo1 = new Logo({ props: { type: "light" }, $$inline: true });

    	avatar = new Avatar({
    			props: { style: "margin:auto" },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "Style Scape";
    			t1 = space();
    			div18 = element("div");
    			div17 = element("div");
    			div2 = element("div");
    			div0 = element("div");
    			figure0 = element("figure");
    			img0 = element("img");
    			t2 = space();
    			div1 = element("div");
    			create_component(logo0.$$.fragment);
    			t3 = space();
    			br = element("br");
    			t4 = space();
    			create_component(logo1.$$.fragment);
    			t5 = space();
    			div13 = element("div");
    			div4 = element("div");
    			div3 = element("div");
    			div3.textContent = "Nulla facilisi. Donec laoreet aliquet gravida. Quisque mauris quam, lacinia nec convallis in, egestas et arcu. Fusce at nisl ac odio porta viverra. Etiam quis lacinia ex, sed placerat velit. Phasellus ullamcorper nisl a magna scelerisque, ut fringilla ligula posuere. Morbi convallis enim eu dignissim tempus. Pellentesque a faucibus velit, suscipit gravida metus. Sed pharetra sit amet magna luctus mollis. Ut eleifend facilisis posuere. Nulla tristique fringilla elit, nec aliquet mauris consequat sit amet. Vivamus elementum luctus arcu eu semper. Pellentesque imperdiet, ex sed vestibulum ornare, sapien mi pretium odio, a convallis nisi metus ut erat.";
    			t7 = space();
    			div12 = element("div");
    			div11 = element("div");
    			div5 = element("div");
    			figure1 = element("figure");
    			img1 = element("img");
    			t8 = space();
    			div6 = element("div");
    			figure2 = element("figure");
    			img2 = element("img");
    			t9 = space();
    			div7 = element("div");
    			figure3 = element("figure");
    			img3 = element("img");
    			t10 = space();
    			div8 = element("div");
    			figure4 = element("figure");
    			img4 = element("img");
    			t11 = space();
    			div9 = element("div");
    			figure5 = element("figure");
    			img5 = element("img");
    			t12 = space();
    			div10 = element("div");
    			figure6 = element("figure");
    			img6 = element("img");
    			t13 = space();
    			div16 = element("div");
    			div14 = element("div");
    			create_component(avatar.$$.fragment);
    			t14 = space();
    			div15 = element("div");
    			figure7 = element("figure");
    			img7 = element("img");
    			attr_dev(h1, "class", "title");
    			add_location(h1, file$8, 5, 0, 122);
    			if (!src_url_equal(img0.src, img0_src_value = "/img/debugsession.png")) attr_dev(img0, "src", img0_src_value);
    			attr_dev(img0, "alt", "code");
    			add_location(img0, file$8, 11, 16, 441);
    			set_style(figure0, "width", "500px");
    			set_style(figure0, "margin", "auto");
    			set_style(figure0, "box-shadow", "15px 18px 10px #2f4f4f");
    			attr_dev(figure0, "class", "image");
    			add_location(figure0, file$8, 10, 12, 334);
    			attr_dev(div0, "class", "section svelte-1fkyjo2");
    			set_style(div0, "background-color", "#c8e6e6");
    			add_location(div0, file$8, 9, 8, 267);
    			add_location(br, file$8, 16, 8, 612);
    			attr_dev(div1, "class", "section svelte-1fkyjo2");
    			set_style(div1, "background-color", "#dc8264");
    			add_location(div1, file$8, 14, 8, 533);
    			attr_dev(div2, "class", "column");
    			add_location(div2, file$8, 8, 4, 238);
    			set_style(div3, "background-color", "#fffafa");
    			set_style(div3, "color", "#000");
    			set_style(div3, "margin-top", "20px");
    			set_style(div3, "padding", "10px");
    			set_style(div3, "width", "100%");
    			add_location(div3, file$8, 22, 12, 784);
    			attr_dev(div4, "class", "section svelte-1fkyjo2");
    			set_style(div4, "background-color", "#b45032");
    			set_style(div4, "color", "#fff");
    			add_location(div4, file$8, 21, 8, 706);
    			if (!src_url_equal(img1.src, img1_src_value = "/img/octocat.png")) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "alt", "github");
    			add_location(img1, file$8, 30, 24, 1842);
    			set_style(figure1, "width", "100px");
    			set_style(figure1, "margin", "20px");
    			attr_dev(figure1, "class", "image");
    			add_location(figure1, file$8, 29, 20, 1762);
    			attr_dev(div5, "class", "column");
    			add_location(div5, file$8, 28, 16, 1721);
    			if (!src_url_equal(img2.src, img2_src_value = "/img/svelte.png")) attr_dev(img2, "src", img2_src_value);
    			attr_dev(img2, "alt", "svelte");
    			add_location(img2, file$8, 35, 24, 2076);
    			set_style(figure2, "width", "100px");
    			set_style(figure2, "margin", "20px");
    			attr_dev(figure2, "class", "image");
    			add_location(figure2, file$8, 34, 20, 1996);
    			attr_dev(div6, "class", "column");
    			add_location(div6, file$8, 33, 16, 1955);
    			if (!src_url_equal(img3.src, img3_src_value = "/img/html.png")) attr_dev(img3, "src", img3_src_value);
    			attr_dev(img3, "alt", "html");
    			add_location(img3, file$8, 40, 24, 2310);
    			set_style(figure3, "width", "100px");
    			set_style(figure3, "margin", "20px");
    			attr_dev(figure3, "class", "image");
    			add_location(figure3, file$8, 39, 20, 2230);
    			attr_dev(div7, "class", "column");
    			add_location(div7, file$8, 38, 17, 2189);
    			if (!src_url_equal(img4.src, img4_src_value = "/img/node.png")) attr_dev(img4, "src", img4_src_value);
    			attr_dev(img4, "alt", "node");
    			add_location(img4, file$8, 45, 24, 2539);
    			set_style(figure4, "width", "100px");
    			set_style(figure4, "margin", "20px");
    			attr_dev(figure4, "class", "image");
    			add_location(figure4, file$8, 44, 20, 2459);
    			attr_dev(div8, "class", "column");
    			add_location(div8, file$8, 43, 16, 2418);
    			if (!src_url_equal(img5.src, img5_src_value = "/img/react.png")) attr_dev(img5, "src", img5_src_value);
    			attr_dev(img5, "alt", "node");
    			add_location(img5, file$8, 50, 24, 2768);
    			set_style(figure5, "width", "100px");
    			set_style(figure5, "margin", "20px");
    			attr_dev(figure5, "class", "image");
    			add_location(figure5, file$8, 49, 20, 2688);
    			attr_dev(div9, "class", "column");
    			add_location(div9, file$8, 48, 16, 2647);
    			if (!src_url_equal(img6.src, img6_src_value = "/img/axure.png")) attr_dev(img6, "src", img6_src_value);
    			attr_dev(img6, "alt", "node");
    			add_location(img6, file$8, 55, 24, 2999);
    			set_style(figure6, "width", "100px");
    			set_style(figure6, "margin", "20px");
    			attr_dev(figure6, "class", "image");
    			add_location(figure6, file$8, 54, 20, 2919);
    			attr_dev(div10, "class", "column");
    			add_location(div10, file$8, 53, 17, 2878);
    			attr_dev(div11, "class", "columns is-mobile is-gapless is-multiline");
    			add_location(div11, file$8, 27, 9, 1649);
    			attr_dev(div12, "class", "section svelte-1fkyjo2");
    			set_style(div12, "background-color", "#f5ffff");
    			add_location(div12, file$8, 26, 8, 1585);
    			attr_dev(div13, "class", "column");
    			add_location(div13, file$8, 20, 4, 677);
    			attr_dev(div14, "class", "section svelte-1fkyjo2");
    			set_style(div14, "background-color", "#fffafa");
    			add_location(div14, file$8, 62, 8, 3173);
    			if (!src_url_equal(img7.src, img7_src_value = "/img/screenshot.jpg")) attr_dev(img7, "src", img7_src_value);
    			attr_dev(img7, "alt", "old tools");
    			add_location(img7, file$8, 67, 16, 3469);
    			set_style(figure7, "width", "600px");
    			set_style(figure7, "margin", "auto");
    			set_style(figure7, "box-shadow", "2px 3px 12px #000");
    			attr_dev(figure7, "class", "image");
    			add_location(figure7, file$8, 66, 9, 3367);
    			attr_dev(div15, "class", "section svelte-1fkyjo2");
    			set_style(div15, "background-color", "#325050");
    			set_style(div15, "color", "#fff");
    			add_location(div15, file$8, 65, 8, 3292);
    			attr_dev(div16, "class", "column");
    			add_location(div16, file$8, 61, 4, 3144);
    			attr_dev(div17, "class", "columns is-mobile is-gapless content");
    			add_location(div17, file$8, 7, 0, 183);
    			attr_dev(div18, "class", "stylescape svelte-1fkyjo2");
    			add_location(div18, file$8, 6, 0, 157);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div18, anchor);
    			append_dev(div18, div17);
    			append_dev(div17, div2);
    			append_dev(div2, div0);
    			append_dev(div0, figure0);
    			append_dev(figure0, img0);
    			append_dev(div2, t2);
    			append_dev(div2, div1);
    			mount_component(logo0, div1, null);
    			append_dev(div1, t3);
    			append_dev(div1, br);
    			append_dev(div1, t4);
    			mount_component(logo1, div1, null);
    			append_dev(div17, t5);
    			append_dev(div17, div13);
    			append_dev(div13, div4);
    			append_dev(div4, div3);
    			append_dev(div13, t7);
    			append_dev(div13, div12);
    			append_dev(div12, div11);
    			append_dev(div11, div5);
    			append_dev(div5, figure1);
    			append_dev(figure1, img1);
    			append_dev(div11, t8);
    			append_dev(div11, div6);
    			append_dev(div6, figure2);
    			append_dev(figure2, img2);
    			append_dev(div11, t9);
    			append_dev(div11, div7);
    			append_dev(div7, figure3);
    			append_dev(figure3, img3);
    			append_dev(div11, t10);
    			append_dev(div11, div8);
    			append_dev(div8, figure4);
    			append_dev(figure4, img4);
    			append_dev(div11, t11);
    			append_dev(div11, div9);
    			append_dev(div9, figure5);
    			append_dev(figure5, img5);
    			append_dev(div11, t12);
    			append_dev(div11, div10);
    			append_dev(div10, figure6);
    			append_dev(figure6, img6);
    			append_dev(div17, t13);
    			append_dev(div17, div16);
    			append_dev(div16, div14);
    			mount_component(avatar, div14, null);
    			append_dev(div16, t14);
    			append_dev(div16, div15);
    			append_dev(div15, figure7);
    			append_dev(figure7, img7);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(logo0.$$.fragment, local);
    			transition_in(logo1.$$.fragment, local);
    			transition_in(avatar.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(logo0.$$.fragment, local);
    			transition_out(logo1.$$.fragment, local);
    			transition_out(avatar.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div18);
    			destroy_component(logo0);
    			destroy_component(logo1);
    			destroy_component(avatar);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('StyleScape', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<StyleScape> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Logo, Avatar });
    	return [];
    }

    class StyleScape extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "StyleScape",
    			options,
    			id: create_fragment$9.name
    		});
    	}
    }

    /* src\Settings\Settings.svelte generated by Svelte v3.48.0 */

    const file$7 = "src\\Settings\\Settings.svelte";

    function create_fragment$8(ctx) {
    	let h1;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "Settings";
    			attr_dev(h1, "class", "title svelte-1cy1co8");
    			add_location(h1, file$7, 2, 0, 19);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Settings', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Settings> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Settings extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Settings",
    			options,
    			id: create_fragment$8.name
    		});
    	}
    }

    /* src\Skills\Skills.svelte generated by Svelte v3.48.0 */

    const file$6 = "src\\Skills\\Skills.svelte";

    function create_fragment$7(ctx) {
    	let h1;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "Skills";
    			attr_dev(h1, "class", "title svelte-t03rb6");
    			add_location(h1, file$6, 2, 0, 19);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Skills', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Skills> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Skills extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Skills",
    			options,
    			id: create_fragment$7.name
    		});
    	}
    }

    /* src\Prototypes\Prototypes.svelte generated by Svelte v3.48.0 */
    const file$5 = "src\\Prototypes\\Prototypes.svelte";

    function create_fragment$6(ctx) {
    	let h1;
    	let t1;
    	let div4;
    	let div3;
    	let div0;
    	let a0;
    	let card0;
    	let t2;
    	let div1;
    	let a1;
    	let card1;
    	let t3;
    	let div2;
    	let a2;
    	let card2;
    	let current;

    	card0 = new Card({
    			props: {
    				title: "Netflix Surfing",
    				img: "/img/surf.png",
    				desc: "What habits can we borrow from Netflix to make watching its content more passive. In this design I expore adding a random or surf mode to Netflix."
    			},
    			$$inline: true
    		});

    	card1 = new Card({
    			props: {
    				title: "Election Mart",
    				img: "/img/votenow.jpg",
    				desc: "Voting in person and by mail is inefficient. Also, it is difficult to know what is on the ballot, and be informed about all the choices. This design explores what an election site might look like."
    			},
    			$$inline: true
    		});

    	card2 = new Card({
    			props: {
    				title: "Cook Order",
    				img: "/img/cook.jpg",
    				desc: "What if a user could search for recipes, and order the ingredients at the touch of a button."
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "Projects";
    			t1 = space();
    			div4 = element("div");
    			div3 = element("div");
    			div0 = element("div");
    			a0 = element("a");
    			create_component(card0.$$.fragment);
    			t2 = space();
    			div1 = element("div");
    			a1 = element("a");
    			create_component(card1.$$.fragment);
    			t3 = space();
    			div2 = element("div");
    			a2 = element("a");
    			create_component(card2.$$.fragment);
    			attr_dev(h1, "class", "title svelte-11ppaqw");
    			add_location(h1, file$5, 4, 0, 57);
    			attr_dev(a0, "href", "https://rdwkn5.axshare.com/");
    			attr_dev(a0, "target", "_blank");
    			attr_dev(a0, "desc", "Open Netflix project");
    			add_location(a0, file$5, 9, 8, 217);
    			attr_dev(div0, "class", "column is-one-third is-centered");
    			add_location(div0, file$5, 8, 4, 163);
    			attr_dev(a1, "href", "https://q23yz8.axshare.com/");
    			attr_dev(a1, "target", "_blank");
    			attr_dev(a1, "title", "open election mart project");
    			add_location(a1, file$5, 14, 8, 586);
    			attr_dev(div1, "class", "column is-one-third");
    			add_location(div1, file$5, 13, 5, 544);
    			attr_dev(a2, "href", "https://ahiwt4.axshare.com/#id=8bnb1m&p=home");
    			attr_dev(a2, "target", "_blank");
    			attr_dev(a2, "title", "open cook order tab");
    			add_location(a2, file$5, 19, 8, 1013);
    			attr_dev(div2, "class", "column is-one-third");
    			add_location(div2, file$5, 18, 5, 971);
    			attr_dev(div3, "class", "columns is-multiline is-centered");
    			add_location(div3, file$5, 7, 0, 112);
    			attr_dev(div4, "class", "section");
    			add_location(div4, file$5, 6, 0, 90);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div4, anchor);
    			append_dev(div4, div3);
    			append_dev(div3, div0);
    			append_dev(div0, a0);
    			mount_component(card0, a0, null);
    			append_dev(div3, t2);
    			append_dev(div3, div1);
    			append_dev(div1, a1);
    			mount_component(card1, a1, null);
    			append_dev(div3, t3);
    			append_dev(div3, div2);
    			append_dev(div2, a2);
    			mount_component(card2, a2, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(card0.$$.fragment, local);
    			transition_in(card1.$$.fragment, local);
    			transition_in(card2.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(card0.$$.fragment, local);
    			transition_out(card1.$$.fragment, local);
    			transition_out(card2.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div4);
    			destroy_component(card0);
    			destroy_component(card1);
    			destroy_component(card2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Prototypes', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Prototypes> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Card });
    	return [];
    }

    class Prototypes extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Prototypes",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    /* src\Grid\Item.svelte generated by Svelte v3.48.0 */

    const file$4 = "src\\Grid\\Item.svelte";

    function create_fragment$5(ctx) {
    	let div;
    	let div_style_value;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[5].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[4], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div, "style", div_style_value = "color:#fff;" + /*stylecolumn*/ ctx[1] + ";" + /*stylerow*/ ctx[0] + ";");
    			attr_dev(div, "class", "item svelte-1irqmhc");
    			add_location(div, file$4, 29, 0, 410);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 16)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[4],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[4])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[4], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*stylecolumn, stylerow*/ 3 && div_style_value !== (div_style_value = "color:#fff;" + /*stylecolumn*/ ctx[1] + ";" + /*stylerow*/ ctx[0] + ";")) {
    				attr_dev(div, "style", div_style_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Item', slots, ['default']);
    	let { column } = $$props;
    	let { row } = $$props;
    	let stylerow = "";
    	let stylecolumn = "";

    	function edit() {
    		$$invalidate(2, column);
    		$$invalidate(3, row);
    	}

    	const writable_props = ['column', 'row'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Item> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('column' in $$props) $$invalidate(2, column = $$props.column);
    		if ('row' in $$props) $$invalidate(3, row = $$props.row);
    		if ('$$scope' in $$props) $$invalidate(4, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ column, row, stylerow, stylecolumn, edit });

    	$$self.$inject_state = $$props => {
    		if ('column' in $$props) $$invalidate(2, column = $$props.column);
    		if ('row' in $$props) $$invalidate(3, row = $$props.row);
    		if ('stylerow' in $$props) $$invalidate(0, stylerow = $$props.stylerow);
    		if ('stylecolumn' in $$props) $$invalidate(1, stylecolumn = $$props.stylecolumn);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*row*/ 8) {
    			if (row == false || row == undefined) {
    				$$invalidate(0, stylerow = "");
    			} else {
    				$$invalidate(0, stylerow = `grid-row:${row};`);
    			}
    		}

    		if ($$self.$$.dirty & /*column, row, stylerow*/ 13) ;

    		if ($$self.$$.dirty & /*column*/ 4) {
    			if (column == false || column == undefined) {
    				$$invalidate(1, stylecolumn = "");
    			} else {
    				$$invalidate(1, stylecolumn = `grid-column:${column};`);
    			}
    		}
    	};

    	return [stylerow, stylecolumn, column, row, $$scope, slots];
    }

    class Item extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, { column: 2, row: 3 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Item",
    			options,
    			id: create_fragment$5.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*column*/ ctx[2] === undefined && !('column' in props)) {
    			console.warn("<Item> was created without expected prop 'column'");
    		}

    		if (/*row*/ ctx[3] === undefined && !('row' in props)) {
    			console.warn("<Item> was created without expected prop 'row'");
    		}
    	}

    	get column() {
    		throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set column(value) {
    		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get row() {
    		throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set row(value) {
    		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\Grid\Grid.svelte generated by Svelte v3.48.0 */

    const { console: console_1 } = globals;
    const file$3 = "src\\Grid\\Grid.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[13] = list[i];
    	child_ctx[14] = list;
    	child_ctx[15] = i;
    	return child_ctx;
    }

    // (44:8) <Item bind:column={item.column} bind:row={item.row} >
    function create_default_slot(ctx) {
    	let p;
    	let t0_value = /*item*/ ctx[13].name + "";
    	let t0;
    	let t1;
    	let t2;
    	let t3;
    	let t4;
    	let br;
    	let t5;
    	let div0;
    	let label0;
    	let t7;
    	let input0;
    	let t8;
    	let label1;
    	let t10;
    	let input1;
    	let t11;
    	let button;
    	let t13;
    	let hr;
    	let t14;
    	let div1;
    	let t16;
    	let mounted;
    	let dispose;

    	function input0_input_handler_1() {
    		/*input0_input_handler_1*/ ctx[7].call(input0, /*each_value*/ ctx[14], /*i*/ ctx[15]);
    	}

    	function input1_input_handler_1() {
    		/*input1_input_handler_1*/ ctx[8].call(input1, /*each_value*/ ctx[14], /*i*/ ctx[15]);
    	}

    	function click_handler(...args) {
    		return /*click_handler*/ ctx[9](/*i*/ ctx[15], ...args);
    	}

    	const block = {
    		c: function create() {
    			p = element("p");
    			t0 = text(t0_value);
    			t1 = text(" (");
    			t2 = text(/*i*/ ctx[15]);
    			t3 = text(")");
    			t4 = space();
    			br = element("br");
    			t5 = space();
    			div0 = element("div");
    			label0 = element("label");
    			label0.textContent = "Column";
    			t7 = space();
    			input0 = element("input");
    			t8 = space();
    			label1 = element("label");
    			label1.textContent = "Row";
    			t10 = space();
    			input1 = element("input");
    			t11 = space();
    			button = element("button");
    			button.textContent = "Remove";
    			t13 = space();
    			hr = element("hr");
    			t14 = space();
    			div1 = element("div");
    			div1.textContent = "Duis bibendum, velit interdum laoreet bibendum, arcu lorem placerat ante, eget venenatis orci justo et dolor. Suspendisse risus libero, bibendum vitae hendrerit eget, vehicula eget lacus. Sed a nunc massa. Mauris enim arcu, molestie in arcu nec, vestibulum pulvinar augue. Nunc efficitur lorem ut ante luctus mattis. Integer finibus imperdiet molestie. Suspendisse viverra neque sit amet tortor dictum rhoncus. In";
    			t16 = space();
    			add_location(p, file$3, 44, 12, 1123);
    			add_location(br, file$3, 45, 12, 1160);
    			attr_dev(label0, "for", "column2");
    			add_location(label0, file$3, 47, 12, 1196);
    			attr_dev(input0, "id", "column2");
    			attr_dev(input0, "type", "text");
    			attr_dev(input0, "class", "svelte-1155uys");
    			add_location(input0, file$3, 48, 12, 1244);
    			attr_dev(label1, "for", "row2");
    			add_location(label1, file$3, 49, 12, 1316);
    			attr_dev(input1, "id", "row2");
    			attr_dev(input1, "type", "text");
    			attr_dev(input1, "class", "svelte-1155uys");
    			add_location(input1, file$3, 50, 12, 1358);
    			add_location(button, file$3, 51, 12, 1424);
    			add_location(div0, file$3, 46, 12, 1178);
    			add_location(hr, file$3, 53, 12, 1517);
    			add_location(div1, file$3, 54, 12, 1535);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t0);
    			append_dev(p, t1);
    			append_dev(p, t2);
    			append_dev(p, t3);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, br, anchor);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, div0, anchor);
    			append_dev(div0, label0);
    			append_dev(div0, t7);
    			append_dev(div0, input0);
    			set_input_value(input0, /*item*/ ctx[13].column);
    			append_dev(div0, t8);
    			append_dev(div0, label1);
    			append_dev(div0, t10);
    			append_dev(div0, input1);
    			set_input_value(input1, /*item*/ ctx[13].row);
    			append_dev(div0, t11);
    			append_dev(div0, button);
    			insert_dev(target, t13, anchor);
    			insert_dev(target, hr, anchor);
    			insert_dev(target, t14, anchor);
    			insert_dev(target, div1, anchor);
    			insert_dev(target, t16, anchor);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input0, "input", input0_input_handler_1),
    					listen_dev(input1, "input", input1_input_handler_1),
    					listen_dev(button, "click", click_handler, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (dirty & /*items*/ 2 && t0_value !== (t0_value = /*item*/ ctx[13].name + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*items*/ 2 && input0.value !== /*item*/ ctx[13].column) {
    				set_input_value(input0, /*item*/ ctx[13].column);
    			}

    			if (dirty & /*items*/ 2 && input1.value !== /*item*/ ctx[13].row) {
    				set_input_value(input1, /*item*/ ctx[13].row);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(br);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t13);
    			if (detaching) detach_dev(hr);
    			if (detaching) detach_dev(t14);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t16);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(44:8) <Item bind:column={item.column} bind:row={item.row} >",
    		ctx
    	});

    	return block;
    }

    // (43:4) {#each items as item,i}
    function create_each_block(ctx) {
    	let item;
    	let updating_column;
    	let updating_row;
    	let current;

    	function item_column_binding(value) {
    		/*item_column_binding*/ ctx[10](value, /*item*/ ctx[13]);
    	}

    	function item_row_binding(value) {
    		/*item_row_binding*/ ctx[11](value, /*item*/ ctx[13]);
    	}

    	let item_props = {
    		$$slots: { default: [create_default_slot] },
    		$$scope: { ctx }
    	};

    	if (/*item*/ ctx[13].column !== void 0) {
    		item_props.column = /*item*/ ctx[13].column;
    	}

    	if (/*item*/ ctx[13].row !== void 0) {
    		item_props.row = /*item*/ ctx[13].row;
    	}

    	item = new Item({ props: item_props, $$inline: true });
    	binding_callbacks.push(() => bind(item, 'column', item_column_binding));
    	binding_callbacks.push(() => bind(item, 'row', item_row_binding));

    	const block = {
    		c: function create() {
    			create_component(item.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(item, target, anchor);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const item_changes = {};

    			if (dirty & /*$$scope, items*/ 65538) {
    				item_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_column && dirty & /*items*/ 2) {
    				updating_column = true;
    				item_changes.column = /*item*/ ctx[13].column;
    				add_flush_callback(() => updating_column = false);
    			}

    			if (!updating_row && dirty & /*items*/ 2) {
    				updating_row = true;
    				item_changes.row = /*item*/ ctx[13].row;
    				add_flush_callback(() => updating_row = false);
    			}

    			item.$set(item_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(item.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(item.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(item, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(43:4) {#each items as item,i}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let div0;
    	let label0;
    	let t1;
    	let input0;
    	let t2;
    	let label1;
    	let t4;
    	let input1;
    	let t5;
    	let label2;
    	let t7;
    	let input2;
    	let t8;
    	let button;
    	let t10;
    	let div1;
    	let current;
    	let mounted;
    	let dispose;
    	let each_value = /*items*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			label0 = element("label");
    			label0.textContent = "Name";
    			t1 = space();
    			input0 = element("input");
    			t2 = space();
    			label1 = element("label");
    			label1.textContent = "Column";
    			t4 = space();
    			input1 = element("input");
    			t5 = space();
    			label2 = element("label");
    			label2.textContent = "Row";
    			t7 = space();
    			input2 = element("input");
    			t8 = space();
    			button = element("button");
    			button.textContent = "Add Grid Item";
    			t10 = space();
    			div1 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(label0, "for", "name");
    			add_location(label0, file$3, 32, 2, 642);
    			attr_dev(input0, "id", "name");
    			set_style(input0, "width", "200px");
    			attr_dev(input0, "type", "text");
    			attr_dev(input0, "class", "svelte-1155uys");
    			add_location(input0, file$3, 33, 2, 675);
    			attr_dev(label1, "for", "column");
    			add_location(label1, file$3, 34, 2, 756);
    			attr_dev(input1, "id", "column");
    			attr_dev(input1, "type", "text");
    			attr_dev(input1, "class", "svelte-1155uys");
    			add_location(input1, file$3, 35, 2, 793);
    			attr_dev(label2, "for", "row");
    			add_location(label2, file$3, 36, 2, 856);
    			attr_dev(input2, "id", "row");
    			attr_dev(input2, "type", "text");
    			attr_dev(input2, "class", "svelte-1155uys");
    			add_location(input2, file$3, 37, 2, 887);
    			add_location(button, file$3, 38, 2, 945);
    			attr_dev(div0, "class", "form svelte-1155uys");
    			add_location(div0, file$3, 31, 0, 621);
    			attr_dev(div1, "class", "wrapper svelte-1155uys");
    			add_location(div1, file$3, 41, 0, 999);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			append_dev(div0, label0);
    			append_dev(div0, t1);
    			append_dev(div0, input0);
    			set_input_value(input0, /*newitem*/ ctx[0].name);
    			append_dev(div0, t2);
    			append_dev(div0, label1);
    			append_dev(div0, t4);
    			append_dev(div0, input1);
    			set_input_value(input1, /*newitem*/ ctx[0].column);
    			append_dev(div0, t5);
    			append_dev(div0, label2);
    			append_dev(div0, t7);
    			append_dev(div0, input2);
    			set_input_value(input2, /*newitem*/ ctx[0].row);
    			append_dev(div0, t8);
    			append_dev(div0, button);
    			insert_dev(target, t10, anchor);
    			insert_dev(target, div1, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div1, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(input0, "input", /*input0_input_handler*/ ctx[4]),
    					listen_dev(input1, "input", /*input1_input_handler*/ ctx[5]),
    					listen_dev(input2, "input", /*input2_input_handler*/ ctx[6]),
    					listen_dev(button, "click", /*add*/ ctx[2], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*newitem*/ 1 && input0.value !== /*newitem*/ ctx[0].name) {
    				set_input_value(input0, /*newitem*/ ctx[0].name);
    			}

    			if (dirty & /*newitem*/ 1 && input1.value !== /*newitem*/ ctx[0].column) {
    				set_input_value(input1, /*newitem*/ ctx[0].column);
    			}

    			if (dirty & /*newitem*/ 1 && input2.value !== /*newitem*/ ctx[0].row) {
    				set_input_value(input2, /*newitem*/ ctx[0].row);
    			}

    			if (dirty & /*items, remove*/ 10) {
    				each_value = /*items*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div1, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t10);
    			if (detaching) detach_dev(div1);
    			destroy_each(each_blocks, detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Grid', slots, []);
    	let newitem = {};
    	let updateitem = {};

    	let items = [
    		{
    			"name": "Header",
    			"column": "1/-1",
    			"row": ""
    		},
    		{
    			"name": "Navigation",
    			"column": "1",
    			"row": "10/19"
    		},
    		{
    			"name": "Main Content",
    			"column": "2/-1",
    			"row": "2/19"
    		},
    		{
    			"name": "Highlights",
    			"column": "1",
    			"row": "2/5"
    		},
    		{
    			"name": "Footer",
    			"column": "1/-1",
    			"row": "20"
    		}
    	];

    	function add(event) {
    		items.push(newitem);
    		$$invalidate(1, items);
    		$$invalidate(0, newitem = {});
    	}

    	function remove(index) {
    		$$invalidate(1, items = [
    			...items.filter((item, i) => {
    				console.log(i);
    				return i !== index;
    			})
    		]);
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<Grid> was created with unknown prop '${key}'`);
    	});

    	function input0_input_handler() {
    		newitem.name = this.value;
    		$$invalidate(0, newitem);
    	}

    	function input1_input_handler() {
    		newitem.column = this.value;
    		$$invalidate(0, newitem);
    	}

    	function input2_input_handler() {
    		newitem.row = this.value;
    		$$invalidate(0, newitem);
    	}

    	function input0_input_handler_1(each_value, i) {
    		each_value[i].column = this.value;
    		$$invalidate(1, items);
    	}

    	function input1_input_handler_1(each_value, i) {
    		each_value[i].row = this.value;
    		$$invalidate(1, items);
    	}

    	const click_handler = (i, event) => remove(i);

    	function item_column_binding(value, item) {
    		if ($$self.$$.not_equal(item.column, value)) {
    			item.column = value;
    			$$invalidate(1, items);
    		}
    	}

    	function item_row_binding(value, item) {
    		if ($$self.$$.not_equal(item.row, value)) {
    			item.row = value;
    			$$invalidate(1, items);
    		}
    	}

    	$$self.$capture_state = () => ({
    		Item,
    		newitem,
    		updateitem,
    		items,
    		add,
    		remove
    	});

    	$$self.$inject_state = $$props => {
    		if ('newitem' in $$props) $$invalidate(0, newitem = $$props.newitem);
    		if ('updateitem' in $$props) updateitem = $$props.updateitem;
    		if ('items' in $$props) $$invalidate(1, items = $$props.items);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		newitem,
    		items,
    		add,
    		remove,
    		input0_input_handler,
    		input1_input_handler,
    		input2_input_handler,
    		input0_input_handler_1,
    		input1_input_handler_1,
    		click_handler,
    		item_column_binding,
    		item_row_binding
    	];
    }

    class Grid extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Grid",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src\router.svelte generated by Svelte v3.48.0 */

    function create_fragment$3(ctx) {
    	let routes_1;
    	let current;

    	routes_1 = new Router$1({
    			props: { routes: /*routes*/ ctx[0] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(routes_1.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(routes_1, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(routes_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(routes_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(routes_1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Router', slots, []);

    	const routes = {
    		'/sizetester': SizeTester,
    		'/landing': Landing,
    		'/styles': Style,
    		'/stylescape': StyleScape,
    		'/settings': Settings,
    		'/skills': Skills,
    		'/prototypes': Prototypes,
    		'/grid': Grid,
    		'*': Landing
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Router> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Routes: Router$1,
    		SizeTester,
    		Landing,
    		Style,
    		StyleScape,
    		Settings,
    		Skills,
    		Prototypes,
    		Grid,
    		routes
    	});

    	return [routes];
    }

    class Router extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Router",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src\Nav.svelte generated by Svelte v3.48.0 */

    const file$2 = "src\\Nav.svelte";

    function create_fragment$2(ctx) {
    	let nav;
    	let div;
    	let a0;
    	let t1;
    	let a1;
    	let t3;
    	let a2;
    	let t5;
    	let hr;
    	let t6;
    	let a3;

    	const block = {
    		c: function create() {
    			nav = element("nav");
    			div = element("div");
    			a0 = element("a");
    			a0.textContent = "JUSTON";
    			t1 = space();
    			a1 = element("a");
    			a1.textContent = "LinkedIn";
    			t3 = space();
    			a2 = element("a");
    			a2.textContent = "Github";
    			t5 = space();
    			hr = element("hr");
    			t6 = space();
    			a3 = element("a");
    			a3.textContent = "Email";
    			attr_dev(a0, "class", "navbar-item");
    			attr_dev(a0, "href", "/");
    			add_location(a0, file$2, 2, 4, 124);
    			attr_dev(a1, "class", "navbar-item");
    			attr_dev(a1, "target", "_blank");
    			attr_dev(a1, "href", "https://www.linkedin.com/in/juston-points-01828630");
    			add_location(a1, file$2, 5, 4, 183);
    			attr_dev(a2, "class", "navbar-item");
    			attr_dev(a2, "target", "_blank");
    			attr_dev(a2, "href", "https://github.com/justonpoints");
    			add_location(a2, file$2, 8, 10, 327);
    			attr_dev(hr, "class", "navbar-divider");
    			add_location(hr, file$2, 11, 10, 450);
    			attr_dev(a3, "class", "navbar-item");
    			attr_dev(a3, "href", "mailto:justonpoints@gmail.com");
    			add_location(a3, file$2, 12, 10, 488);
    			attr_dev(div, "class", "navbar-brand");
    			add_location(div, file$2, 1, 2, 93);
    			attr_dev(nav, "class", "columns navbar is-primary top");
    			attr_dev(nav, "role", "navigation");
    			attr_dev(nav, "aria-label", "main navigation");
    			add_location(nav, file$2, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, nav, anchor);
    			append_dev(nav, div);
    			append_dev(div, a0);
    			append_dev(div, t1);
    			append_dev(div, a1);
    			append_dev(div, t3);
    			append_dev(div, a2);
    			append_dev(div, t5);
    			append_dev(div, hr);
    			append_dev(div, t6);
    			append_dev(div, a3);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(nav);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Nav', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Nav> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Nav extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Nav",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src\Menu\Menu.svelte generated by Svelte v3.48.0 */
    const file$1 = "src\\Menu\\Menu.svelte";

    function create_fragment$1(ctx) {
    	let div0;
    	let t0;
    	let div0_class_value;
    	let t1;
    	let div3;
    	let menu_1;
    	let a0;
    	let t3;
    	let a1;
    	let t5;
    	let a2;
    	let t7;
    	let a3;
    	let t9;
    	let a4;
    	let t11;
    	let a5;
    	let t13;
    	let div1;
    	let t14;
    	let t15;
    	let t16;
    	let div2;
    	let div3_class_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			t0 = text(/*menu*/ ctx[1]);
    			t1 = space();
    			div3 = element("div");
    			menu_1 = element("menu");
    			a0 = element("a");
    			a0.textContent = "Home";
    			t3 = space();
    			a1 = element("a");
    			a1.textContent = "Projects";
    			t5 = space();
    			a2 = element("a");
    			a2.textContent = "Style";
    			t7 = space();
    			a3 = element("a");
    			a3.textContent = "Grid";
    			t9 = space();
    			a4 = element("a");
    			a4.textContent = "Mobile Tester";
    			t11 = space();
    			a5 = element("a");
    			a5.textContent = "Skills";
    			t13 = space();
    			div1 = element("div");
    			t14 = text("Switch ");
    			t15 = text(/*hand*/ ctx[2]);
    			t16 = space();
    			div2 = element("div");
    			div2.textContent = "Close";
    			attr_dev(div0, "class", div0_class_value = "floating-btn " + /*active*/ ctx[0] + " " + /*hand*/ ctx[2] + " svelte-1psi10s");
    			add_location(div0, file$1, 36, 0, 507);
    			attr_dev(a0, "href", "#/home");
    			attr_dev(a0, "class", "menu-item svelte-1psi10s");
    			toggle_class(a0, "current", /*current*/ ctx[3] === '/home' || /*current*/ ctx[3] === '/');
    			add_location(a0, file$1, 43, 4, 673);
    			attr_dev(a1, "href", "#/prototypes");
    			attr_dev(a1, "class", "menu-item svelte-1psi10s");
    			toggle_class(a1, "current", /*current*/ ctx[3] === '/prototypes');
    			add_location(a1, file$1, 44, 4, 802);
    			attr_dev(a2, "href", "#/styles");
    			attr_dev(a2, "class", "menu-item svelte-1psi10s");
    			toggle_class(a2, "current", /*current*/ ctx[3] === '/styles');
    			add_location(a2, file$1, 45, 4, 928);
    			attr_dev(a3, "href", "#/grid");
    			attr_dev(a3, "class", "menu-item svelte-1psi10s");
    			toggle_class(a3, "current", /*current*/ ctx[3] === '/grid');
    			add_location(a3, file$1, 46, 4, 1043);
    			attr_dev(a4, "href", "#/sizetester");
    			attr_dev(a4, "class", "menu-item svelte-1psi10s");
    			toggle_class(a4, "current", /*current*/ ctx[3] === '/sizetester');
    			add_location(a4, file$1, 47, 4, 1153);
    			attr_dev(a5, "href", "#/skills");
    			attr_dev(a5, "class", "menu-item svelte-1psi10s");
    			toggle_class(a5, "current", /*current*/ ctx[3] === '/skills');
    			add_location(a5, file$1, 48, 4, 1284);
    			attr_dev(div1, "class", "menu-item svelte-1psi10s");
    			add_location(div1, file$1, 49, 4, 1400);
    			attr_dev(div2, "class", "menu-item close svelte-1psi10s");
    			add_location(div2, file$1, 50, 4, 1469);
    			attr_dev(menu_1, "class", "items-wrapper svelte-1psi10s");
    			add_location(menu_1, file$1, 42, 2, 640);
    			attr_dev(div3, "class", div3_class_value = "circular-menu " + /*active*/ ctx[0] + " " + /*hand*/ ctx[2] + " svelte-1psi10s");
    			add_location(div3, file$1, 40, 0, 593);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			append_dev(div0, t0);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div3, anchor);
    			append_dev(div3, menu_1);
    			append_dev(menu_1, a0);
    			append_dev(menu_1, t3);
    			append_dev(menu_1, a1);
    			append_dev(menu_1, t5);
    			append_dev(menu_1, a2);
    			append_dev(menu_1, t7);
    			append_dev(menu_1, a3);
    			append_dev(menu_1, t9);
    			append_dev(menu_1, a4);
    			append_dev(menu_1, t11);
    			append_dev(menu_1, a5);
    			append_dev(menu_1, t13);
    			append_dev(menu_1, div1);
    			append_dev(div1, t14);
    			append_dev(div1, t15);
    			append_dev(menu_1, t16);
    			append_dev(menu_1, div2);

    			if (!mounted) {
    				dispose = [
    					listen_dev(div0, "click", /*toggleActive*/ ctx[4], false, false, false),
    					listen_dev(a0, "click", /*toggleActive*/ ctx[4], false, false, false),
    					listen_dev(a1, "click", /*toggleActive*/ ctx[4], false, false, false),
    					listen_dev(a2, "click", /*toggleActive*/ ctx[4], false, false, false),
    					listen_dev(a3, "click", /*toggleActive*/ ctx[4], false, false, false),
    					listen_dev(a4, "click", /*toggleActive*/ ctx[4], false, false, false),
    					listen_dev(a5, "click", /*toggleActive*/ ctx[4], false, false, false),
    					listen_dev(div1, "click", /*changehand*/ ctx[5], false, false, false),
    					listen_dev(div2, "click", /*toggleActive*/ ctx[4], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*menu*/ 2) set_data_dev(t0, /*menu*/ ctx[1]);

    			if (dirty & /*active, hand*/ 5 && div0_class_value !== (div0_class_value = "floating-btn " + /*active*/ ctx[0] + " " + /*hand*/ ctx[2] + " svelte-1psi10s")) {
    				attr_dev(div0, "class", div0_class_value);
    			}

    			if (dirty & /*current*/ 8) {
    				toggle_class(a0, "current", /*current*/ ctx[3] === '/home' || /*current*/ ctx[3] === '/');
    			}

    			if (dirty & /*current*/ 8) {
    				toggle_class(a1, "current", /*current*/ ctx[3] === '/prototypes');
    			}

    			if (dirty & /*current*/ 8) {
    				toggle_class(a2, "current", /*current*/ ctx[3] === '/styles');
    			}

    			if (dirty & /*current*/ 8) {
    				toggle_class(a3, "current", /*current*/ ctx[3] === '/grid');
    			}

    			if (dirty & /*current*/ 8) {
    				toggle_class(a4, "current", /*current*/ ctx[3] === '/sizetester');
    			}

    			if (dirty & /*current*/ 8) {
    				toggle_class(a5, "current", /*current*/ ctx[3] === '/skills');
    			}

    			if (dirty & /*hand*/ 4) set_data_dev(t15, /*hand*/ ctx[2]);

    			if (dirty & /*active, hand*/ 5 && div3_class_value !== (div3_class_value = "circular-menu " + /*active*/ ctx[0] + " " + /*hand*/ ctx[2] + " svelte-1psi10s")) {
    				attr_dev(div3, "class", div3_class_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div3);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let $location;
    	validate_store(location, 'location');
    	component_subscribe($$self, location, $$value => $$invalidate(6, $location = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Menu', slots, []);
    	let active = "";
    	let menu = "NAVIGATION HERE";
    	let hand = "right";
    	let current = $location;

    	function updateCurrent() {
    		$$invalidate(3, current = $location);
    	}

    	function toggleActive() {
    		if (active === "active") {
    			$$invalidate(0, active = "");
    			$$invalidate(1, menu = "MENU");
    		} else {
    			$$invalidate(0, active = "active");
    			$$invalidate(1, menu = "CLOSE");
    		}
    	}

    	function changehand() {
    		if (hand === "left") {
    			$$invalidate(2, hand = "right");
    		} else {
    			$$invalidate(2, hand = "left");
    		}
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Menu> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		location,
    		active,
    		menu,
    		hand,
    		current,
    		updateCurrent,
    		toggleActive,
    		changehand,
    		$location
    	});

    	$$self.$inject_state = $$props => {
    		if ('active' in $$props) $$invalidate(0, active = $$props.active);
    		if ('menu' in $$props) $$invalidate(1, menu = $$props.menu);
    		if ('hand' in $$props) $$invalidate(2, hand = $$props.hand);
    		if ('current' in $$props) $$invalidate(3, current = $$props.current);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$location*/ 64) {
    			(updateCurrent());
    		}
    	};

    	return [active, menu, hand, current, toggleActive, changehand, $location];
    }

    class Menu extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Menu",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src\App.svelte generated by Svelte v3.48.0 */
    const file = "src\\App.svelte";

    function create_fragment(ctx) {
    	let menu;
    	let t0;
    	let nav;
    	let t1;
    	let main;
    	let router;
    	let current;
    	menu = new Menu({ $$inline: true });
    	nav = new Nav({ $$inline: true });
    	router = new Router({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(menu.$$.fragment);
    			t0 = space();
    			create_component(nav.$$.fragment);
    			t1 = space();
    			main = element("main");
    			create_component(router.$$.fragment);
    			add_location(main, file, 8, 0, 146);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(menu, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(nav, target, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, main, anchor);
    			mount_component(router, main, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(menu.$$.fragment, local);
    			transition_in(nav.$$.fragment, local);
    			transition_in(router.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(menu.$$.fragment, local);
    			transition_out(nav.$$.fragment, local);
    			transition_out(router.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(menu, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(nav, detaching);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(main);
    			destroy_component(router);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Router, Nav, Menu });
    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    		name: 'world'
    	}
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
