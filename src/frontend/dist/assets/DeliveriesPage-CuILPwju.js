import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, d as useComposedRefs, a as cn, T as Truck, B as Button, b as ue } from "./index-Kf6cq2Mp.js";
import { q as useControllableState, r as useId, s as Primitive, t as composeEventHandlers, v as Presence, w as Portal$1, x as hideOthers, R as ReactRemoveScroll, y as createContextScope, z as createSlot, B as useFocusGuards, F as FocusScope, E as DismissableLayer, u as useCustomers, S as Search, I as Input, P as Pencil, T as Trash2, D as Dialog, d as DialogContent, e as DialogHeader, f as DialogTitle, A as AlertDialog, g as AlertDialogContent, h as AlertDialogHeader, i as AlertDialogTitle, j as AlertDialogDescription, k as AlertDialogFooter, l as AlertDialogCancel, m as AlertDialogAction, p as ArrowUpDown, o as ChevronDown, L as Label, n as DialogFooter } from "./useCustomers-CXb1NHKR.js";
import { R as Root2$1, A as Anchor, c as createPopperScope, C as Content, a as Arrow, S as Select, b as SelectTrigger, d as SelectValue, e as SelectContent, f as SelectItem } from "./select-YC5-nodD.js";
import { L as Layout, S as Skeleton, P as Plus, f as formatCurrency, b as formatDate, g as getStatusLabel } from "./types-CD4imbHJ.js";
import { u as useDeliveries, a as useAddDelivery, b as useUpdateDelivery, c as useDeleteDelivery, d as useUpdateDeliveryStatus } from "./useDeliveries-CJULxTiu.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M12 5v14", key: "s699le" }],
  ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
];
const ArrowDown = createLucideIcon("arrow-down", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
  ["path", { d: "M12 19V5", key: "x0mq9r" }]
];
const ArrowUp = createLucideIcon("arrow-up", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]];
const Circle = createLucideIcon("circle", __iconNode);
var POPOVER_NAME = "Popover";
var [createPopoverContext] = createContextScope(POPOVER_NAME, [
  createPopperScope
]);
var usePopperScope = createPopperScope();
var [PopoverProvider, usePopoverContext] = createPopoverContext(POPOVER_NAME);
var Popover$1 = (props) => {
  const {
    __scopePopover,
    children,
    open: openProp,
    defaultOpen,
    onOpenChange,
    modal = false
  } = props;
  const popperScope = usePopperScope(__scopePopover);
  const triggerRef = reactExports.useRef(null);
  const [hasCustomAnchor, setHasCustomAnchor] = reactExports.useState(false);
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen ?? false,
    onChange: onOpenChange,
    caller: POPOVER_NAME
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root2$1, { ...popperScope, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    PopoverProvider,
    {
      scope: __scopePopover,
      contentId: useId(),
      triggerRef,
      open,
      onOpenChange: setOpen,
      onOpenToggle: reactExports.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
      hasCustomAnchor,
      onCustomAnchorAdd: reactExports.useCallback(() => setHasCustomAnchor(true), []),
      onCustomAnchorRemove: reactExports.useCallback(() => setHasCustomAnchor(false), []),
      modal,
      children
    }
  ) });
};
Popover$1.displayName = POPOVER_NAME;
var ANCHOR_NAME = "PopoverAnchor";
var PopoverAnchor = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopePopover, ...anchorProps } = props;
    const context = usePopoverContext(ANCHOR_NAME, __scopePopover);
    const popperScope = usePopperScope(__scopePopover);
    const { onCustomAnchorAdd, onCustomAnchorRemove } = context;
    reactExports.useEffect(() => {
      onCustomAnchorAdd();
      return () => onCustomAnchorRemove();
    }, [onCustomAnchorAdd, onCustomAnchorRemove]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Anchor, { ...popperScope, ...anchorProps, ref: forwardedRef });
  }
);
PopoverAnchor.displayName = ANCHOR_NAME;
var TRIGGER_NAME = "PopoverTrigger";
var PopoverTrigger$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopePopover, ...triggerProps } = props;
    const context = usePopoverContext(TRIGGER_NAME, __scopePopover);
    const popperScope = usePopperScope(__scopePopover);
    const composedTriggerRef = useComposedRefs(forwardedRef, context.triggerRef);
    const trigger = /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": context.open,
        "aria-controls": context.contentId,
        "data-state": getState(context.open),
        ...triggerProps,
        ref: composedTriggerRef,
        onClick: composeEventHandlers(props.onClick, context.onOpenToggle)
      }
    );
    return context.hasCustomAnchor ? trigger : /* @__PURE__ */ jsxRuntimeExports.jsx(Anchor, { asChild: true, ...popperScope, children: trigger });
  }
);
PopoverTrigger$1.displayName = TRIGGER_NAME;
var PORTAL_NAME = "PopoverPortal";
var [PortalProvider, usePortalContext] = createPopoverContext(PORTAL_NAME, {
  forceMount: void 0
});
var PopoverPortal = (props) => {
  const { __scopePopover, forceMount, children, container } = props;
  const context = usePopoverContext(PORTAL_NAME, __scopePopover);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PortalProvider, { scope: __scopePopover, forceMount, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Portal$1, { asChild: true, container, children }) }) });
};
PopoverPortal.displayName = PORTAL_NAME;
var CONTENT_NAME = "PopoverContent";
var PopoverContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const portalContext = usePortalContext(CONTENT_NAME, props.__scopePopover);
    const { forceMount = portalContext.forceMount, ...contentProps } = props;
    const context = usePopoverContext(CONTENT_NAME, props.__scopePopover);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: context.modal ? /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverContentModal, { ...contentProps, ref: forwardedRef }) : /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverContentNonModal, { ...contentProps, ref: forwardedRef }) });
  }
);
PopoverContent$1.displayName = CONTENT_NAME;
var Slot = createSlot("PopoverContent.RemoveScroll");
var PopoverContentModal = reactExports.forwardRef(
  (props, forwardedRef) => {
    const context = usePopoverContext(CONTENT_NAME, props.__scopePopover);
    const contentRef = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, contentRef);
    const isRightClickOutsideRef = reactExports.useRef(false);
    reactExports.useEffect(() => {
      const content = contentRef.current;
      if (content) return hideOthers(content);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ReactRemoveScroll, { as: Slot, allowPinchZoom: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      PopoverContentImpl,
      {
        ...props,
        ref: composedRefs,
        trapFocus: context.open,
        disableOutsidePointerEvents: true,
        onCloseAutoFocus: composeEventHandlers(props.onCloseAutoFocus, (event) => {
          var _a;
          event.preventDefault();
          if (!isRightClickOutsideRef.current) (_a = context.triggerRef.current) == null ? void 0 : _a.focus();
        }),
        onPointerDownOutside: composeEventHandlers(
          props.onPointerDownOutside,
          (event) => {
            const originalEvent = event.detail.originalEvent;
            const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
            const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
            isRightClickOutsideRef.current = isRightClick;
          },
          { checkForDefaultPrevented: false }
        ),
        onFocusOutside: composeEventHandlers(
          props.onFocusOutside,
          (event) => event.preventDefault(),
          { checkForDefaultPrevented: false }
        )
      }
    ) });
  }
);
var PopoverContentNonModal = reactExports.forwardRef(
  (props, forwardedRef) => {
    const context = usePopoverContext(CONTENT_NAME, props.__scopePopover);
    const hasInteractedOutsideRef = reactExports.useRef(false);
    const hasPointerDownOutsideRef = reactExports.useRef(false);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      PopoverContentImpl,
      {
        ...props,
        ref: forwardedRef,
        trapFocus: false,
        disableOutsidePointerEvents: false,
        onCloseAutoFocus: (event) => {
          var _a, _b;
          (_a = props.onCloseAutoFocus) == null ? void 0 : _a.call(props, event);
          if (!event.defaultPrevented) {
            if (!hasInteractedOutsideRef.current) (_b = context.triggerRef.current) == null ? void 0 : _b.focus();
            event.preventDefault();
          }
          hasInteractedOutsideRef.current = false;
          hasPointerDownOutsideRef.current = false;
        },
        onInteractOutside: (event) => {
          var _a, _b;
          (_a = props.onInteractOutside) == null ? void 0 : _a.call(props, event);
          if (!event.defaultPrevented) {
            hasInteractedOutsideRef.current = true;
            if (event.detail.originalEvent.type === "pointerdown") {
              hasPointerDownOutsideRef.current = true;
            }
          }
          const target = event.target;
          const targetIsTrigger = (_b = context.triggerRef.current) == null ? void 0 : _b.contains(target);
          if (targetIsTrigger) event.preventDefault();
          if (event.detail.originalEvent.type === "focusin" && hasPointerDownOutsideRef.current) {
            event.preventDefault();
          }
        }
      }
    );
  }
);
var PopoverContentImpl = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopePopover,
      trapFocus,
      onOpenAutoFocus,
      onCloseAutoFocus,
      disableOutsidePointerEvents,
      onEscapeKeyDown,
      onPointerDownOutside,
      onFocusOutside,
      onInteractOutside,
      ...contentProps
    } = props;
    const context = usePopoverContext(CONTENT_NAME, __scopePopover);
    const popperScope = usePopperScope(__scopePopover);
    useFocusGuards();
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      FocusScope,
      {
        asChild: true,
        loop: true,
        trapped: trapFocus,
        onMountAutoFocus: onOpenAutoFocus,
        onUnmountAutoFocus: onCloseAutoFocus,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          DismissableLayer,
          {
            asChild: true,
            disableOutsidePointerEvents,
            onInteractOutside,
            onEscapeKeyDown,
            onPointerDownOutside,
            onFocusOutside,
            onDismiss: () => context.onOpenChange(false),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Content,
              {
                "data-state": getState(context.open),
                role: "dialog",
                id: context.contentId,
                ...popperScope,
                ...contentProps,
                ref: forwardedRef,
                style: {
                  ...contentProps.style,
                  // re-namespace exposed content custom properties
                  ...{
                    "--radix-popover-content-transform-origin": "var(--radix-popper-transform-origin)",
                    "--radix-popover-content-available-width": "var(--radix-popper-available-width)",
                    "--radix-popover-content-available-height": "var(--radix-popper-available-height)",
                    "--radix-popover-trigger-width": "var(--radix-popper-anchor-width)",
                    "--radix-popover-trigger-height": "var(--radix-popper-anchor-height)"
                  }
                }
              }
            )
          }
        )
      }
    );
  }
);
var CLOSE_NAME = "PopoverClose";
var PopoverClose = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopePopover, ...closeProps } = props;
    const context = usePopoverContext(CLOSE_NAME, __scopePopover);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        ...closeProps,
        ref: forwardedRef,
        onClick: composeEventHandlers(props.onClick, () => context.onOpenChange(false))
      }
    );
  }
);
PopoverClose.displayName = CLOSE_NAME;
var ARROW_NAME = "PopoverArrow";
var PopoverArrow = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopePopover, ...arrowProps } = props;
    const popperScope = usePopperScope(__scopePopover);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Arrow, { ...popperScope, ...arrowProps, ref: forwardedRef });
  }
);
PopoverArrow.displayName = ARROW_NAME;
function getState(open) {
  return open ? "open" : "closed";
}
var Root2 = Popover$1;
var Trigger = PopoverTrigger$1;
var Portal = PopoverPortal;
var Content2 = PopoverContent$1;
function Popover({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root2, { "data-slot": "popover", ...props });
}
function PopoverTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Trigger, { "data-slot": "popover-trigger", ...props });
}
function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content2,
    {
      "data-slot": "popover-content",
      align,
      sideOffset,
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
        className
      ),
      ...props
    }
  ) });
}
const STATUS_COLOR = {
  pending: "bg-amber-100 text-amber-800 border-amber-200",
  delivered: "bg-emerald-100 text-emerald-800 border-emerald-200",
  cancelled: "bg-muted text-muted-foreground border-border"
};
function StatusBadge({ status }) {
  const key = "pending" in status ? "pending" : "delivered" in status ? "delivered" : "cancelled";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: `inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${STATUS_COLOR[key]}`,
      children: [
        key === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "w-2.5 h-2.5 fill-amber-500 text-amber-500" }),
        key === "delivered" && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-2.5 h-2.5" }),
        key === "cancelled" && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-2.5 h-2.5" }),
        getStatusLabel(status)
      ]
    }
  );
}
const ALL_STATUSES = [
  { label: "Pending", value: { pending: null }, key: "pending" },
  { label: "Delivered", value: { delivered: null }, key: "delivered" },
  { label: "Cancelled", value: { cancelled: null }, key: "cancelled" }
];
function StatusSelector({
  delivery,
  index
}) {
  const updateStatus = useUpdateDeliveryStatus();
  const [open, setOpen] = reactExports.useState(false);
  const currentKey = "pending" in delivery.status ? "pending" : "delivered" in delivery.status ? "delivered" : "cancelled";
  const handleSelect = async (s, key) => {
    if (key === currentKey) {
      setOpen(false);
      return;
    }
    setOpen(false);
    try {
      await updateStatus.mutateAsync({ id: delivery.id, status: s });
      ue.success(`Status updated to ${getStatusLabel(s)}`);
    } catch {
      ue.error("Failed to update status");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        className: "flex items-center gap-1 group",
        "data-ocid": `deliveries.status_selector.${index}`,
        "aria-label": "Change status",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: delivery.status }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PopoverContent,
      {
        className: "w-44 p-1",
        align: "start",
        "data-ocid": `deliveries.status_popover.${index}`,
        children: ALL_STATUSES.map(({ label, value, key }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => handleSelect(value, key),
            className: `w-full flex items-center gap-2 px-3 py-1.5 text-sm rounded-md transition-colors hover:bg-muted/60 ${currentKey === key ? "font-semibold" : "text-muted-foreground"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `w-2 h-2 rounded-full flex-shrink-0 ${key === "pending" ? "bg-amber-400" : key === "delivered" ? "bg-emerald-500" : "bg-muted-foreground/40"}`
                }
              ),
              label,
              currentKey === key && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3 ml-auto text-primary" })
            ]
          },
          key
        ))
      }
    )
  ] });
}
function DeliveryForm({
  customers,
  initial,
  onSubmit,
  loading,
  onCancel
}) {
  var _a, _b, _c;
  const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const [form, setForm] = reactExports.useState({
    customerId: ((_a = initial == null ? void 0 : initial.customerId) == null ? void 0 : _a.toString()) ?? "",
    quantity: ((_b = initial == null ? void 0 : initial.quantity) == null ? void 0 : _b.toString()) ?? "1",
    pricePerCan: ((_c = initial == null ? void 0 : initial.pricePerCan) == null ? void 0 : _c.toString()) ?? "30",
    deliveryDate: (initial == null ? void 0 : initial.deliveryDate) ? new Date(Number(initial.deliveryDate) / 1e6).toISOString().split("T")[0] : today
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      customerId: BigInt(form.customerId),
      quantity: BigInt(form.quantity),
      pricePerCan: BigInt(form.pricePerCan),
      deliveryDate: BigInt(new Date(form.deliveryDate).getTime()) * 1000000n
    });
  };
  const total = form.quantity && form.pricePerCan ? Number(form.quantity) * Number(form.pricePerCan) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Customer" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          value: form.customerId,
          onValueChange: (v) => setForm((p) => ({ ...p, customerId: v })),
          required: true,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                className: "mt-1",
                "data-ocid": "delivery_form.customer_select",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select customer..." })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: customers.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: c.id.toString(), children: [
              c.name,
              " — ",
              c.phone
            ] }, c.id.toString())) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "d-qty", children: "Quantity (cans)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "d-qty",
            type: "number",
            min: "1",
            value: form.quantity,
            onChange: (e) => setForm((p) => ({ ...p, quantity: e.target.value })),
            required: true,
            "data-ocid": "delivery_form.quantity_input",
            className: "mt-1"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "d-price", children: "Price per Can (₹)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "d-price",
            type: "number",
            min: "1",
            value: form.pricePerCan,
            onChange: (e) => setForm((p) => ({ ...p, pricePerCan: e.target.value })),
            required: true,
            "data-ocid": "delivery_form.price_input",
            className: "mt-1"
          }
        )
      ] })
    ] }),
    total > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 py-2.5 rounded-lg bg-primary/5 border border-primary/15 text-sm flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Estimated Total" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
        "₹",
        total.toLocaleString("en-IN")
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "d-date", children: "Delivery Date" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: "d-date",
          type: "date",
          value: form.deliveryDate,
          onChange: (e) => setForm((p) => ({ ...p, deliveryDate: e.target.value })),
          required: true,
          "data-ocid": "delivery_form.date_input",
          className: "mt-1"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "outline",
          onClick: onCancel,
          "data-ocid": "delivery_form.cancel_button",
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "submit",
          disabled: loading || !form.customerId,
          "data-ocid": "delivery_form.submit_button",
          children: loading ? "Saving..." : "Save Delivery"
        }
      )
    ] })
  ] });
}
function sortDeliveries(list, key, dir, customerMap) {
  return [...list].sort((a, b) => {
    let av = 0;
    let bv = 0;
    switch (key) {
      case "id":
        av = Number(a.id);
        bv = Number(b.id);
        break;
      case "customer":
        av = customerMap.get(a.customerId.toString()) ?? "";
        bv = customerMap.get(b.customerId.toString()) ?? "";
        break;
      case "quantity":
        av = Number(a.quantity);
        bv = Number(b.quantity);
        break;
      case "pricePerCan":
        av = Number(a.pricePerCan);
        bv = Number(b.pricePerCan);
        break;
      case "totalAmount":
        av = Number(a.totalAmount);
        bv = Number(b.totalAmount);
        break;
      case "deliveryDate":
        av = Number(a.deliveryDate);
        bv = Number(b.deliveryDate);
        break;
      case "status":
        av = getStatusLabel(a.status);
        bv = getStatusLabel(b.status);
        break;
    }
    if (av < bv) return dir === "asc" ? -1 : 1;
    if (av > bv) return dir === "asc" ? 1 : -1;
    return 0;
  });
}
function SortableHeader({
  label,
  sortKey,
  current,
  dir,
  onSort,
  align = "left"
}) {
  const active = current === sortKey;
  const Icon = !active ? ArrowUpDown : dir === "asc" ? ArrowUp : ArrowDown;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "th",
    {
      className: `text-xs font-semibold text-muted-foreground uppercase tracking-wide py-3 px-4 ${align === "right" ? "text-right" : "text-left"}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => onSort(sortKey),
          className: `inline-flex items-center gap-1 hover:text-foreground transition-colors ${active ? "text-foreground" : ""}`,
          children: [
            label,
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Icon,
              {
                className: `w-3 h-3 ${active ? "text-primary" : "text-muted-foreground/40"}`
              }
            )
          ]
        }
      )
    }
  );
}
const STATUS_FILTERS = ["all", "pending", "delivered", "cancelled"];
function DeliveriesPage() {
  const { data: deliveries, isLoading } = useDeliveries();
  const { data: customers } = useCustomers();
  const addMutation = useAddDelivery();
  const updateMutation = useUpdateDelivery();
  const deleteMutation = useDeleteDelivery();
  const [search, setSearch] = reactExports.useState("");
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [customerFilter, setCustomerFilter] = reactExports.useState("all");
  const [sortKey, setSortKey] = reactExports.useState("deliveryDate");
  const [sortDir, setSortDir] = reactExports.useState("desc");
  const [showAdd, setShowAdd] = reactExports.useState(false);
  const [editingDelivery, setEditingDelivery] = reactExports.useState(
    null
  );
  const [deletingId, setDeletingId] = reactExports.useState(null);
  const customerMap = new Map(
    (customers ?? []).map((c) => [c.id.toString(), c.name])
  );
  const handleSort = (key) => {
    if (key === sortKey) setSortDir((d) => d === "asc" ? "desc" : "asc");
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  };
  const filtered = (deliveries ?? []).filter((d) => {
    const cName = customerMap.get(d.customerId.toString()) ?? "";
    const matchesSearch = cName.toLowerCase().includes(search.toLowerCase()) || String(Number(d.id)).includes(search);
    const matchesStatus = statusFilter === "all" || statusFilter in d.status;
    const matchesCustomer = customerFilter === "all" || d.customerId.toString() === customerFilter;
    return matchesSearch && matchesStatus && matchesCustomer;
  });
  const sorted = sortDeliveries(filtered, sortKey, sortDir, customerMap);
  const handleAdd = async (data) => {
    try {
      await addMutation.mutateAsync(data);
      ue.success("Delivery recorded successfully");
      setShowAdd(false);
    } catch {
      ue.error("Failed to add delivery");
    }
  };
  const handleUpdate = async (data) => {
    if (!editingDelivery) return;
    try {
      await updateMutation.mutateAsync({ id: editingDelivery.id, input: data });
      ue.success("Delivery updated");
      setEditingDelivery(null);
    } catch {
      ue.error("Failed to update delivery");
    }
  };
  const handleDelete = async () => {
    if (deletingId === null) return;
    try {
      await deleteMutation.mutateAsync(deletingId);
      ue.success("Delivery deleted");
      setDeletingId(null);
    } catch {
      ue.error("Failed to delete delivery");
    }
  };
  const customerOptions = (customers ?? []).map((c) => ({
    value: c.id.toString(),
    label: c.name
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Layout,
    {
      title: "Deliveries",
      subtitle: `${sorted.length} record${sorted.length !== 1 ? "s" : ""}`,
      actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          onClick: () => setShowAdd(true),
          "data-ocid": "deliveries.add_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-1" }),
            " Add Delivery"
          ]
        }
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: search,
                onChange: (e) => setSearch(e.target.value),
                placeholder: "Search by customer or delivery ID...",
                className: "pl-9",
                "data-ocid": "deliveries.search_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: customerFilter, onValueChange: setCustomerFilter, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                className: "w-full sm:w-44",
                "data-ocid": "deliveries.customer_filter",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All customers" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All customers" }),
              customerOptions.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c.value, children: c.label }, c.value))
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5 flex-wrap", children: STATUS_FILTERS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setStatusFilter(s),
              "data-ocid": `deliveries.filter.${s}`,
              className: `px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${statusFilter === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/70"}`,
              children: s === "all" ? "All" : s
            },
            s
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-xl overflow-hidden", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 space-y-3", "data-ocid": "deliveries.loading_state", children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-full rounded-lg" }, i)) }) : sorted.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center justify-center py-16 px-4 text-center",
            "data-ocid": "deliveries.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-10 h-10 text-muted-foreground/30 mb-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-medium text-foreground mb-1", children: search || statusFilter !== "all" || customerFilter !== "all" ? "No matching deliveries" : "No deliveries yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: search || statusFilter !== "all" || customerFilter !== "all" ? "Try adjusting your filters" : "Record your first delivery to get started" }),
              !search && statusFilter === "all" && customerFilter === "all" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  onClick: () => setShowAdd(true),
                  "data-ocid": "deliveries.empty_add_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-1" }),
                    " Add Delivery"
                  ]
                }
              )
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:block overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/40", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SortableHeader,
                {
                  label: "ID",
                  sortKey: "id",
                  current: sortKey,
                  dir: sortDir,
                  onSort: handleSort
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SortableHeader,
                {
                  label: "Customer",
                  sortKey: "customer",
                  current: sortKey,
                  dir: sortDir,
                  onSort: handleSort
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SortableHeader,
                {
                  label: "Qty",
                  sortKey: "quantity",
                  current: sortKey,
                  dir: sortDir,
                  onSort: handleSort,
                  align: "right"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SortableHeader,
                {
                  label: "Price/Can",
                  sortKey: "pricePerCan",
                  current: sortKey,
                  dir: sortDir,
                  onSort: handleSort,
                  align: "right"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SortableHeader,
                {
                  label: "Total",
                  sortKey: "totalAmount",
                  current: sortKey,
                  dir: sortDir,
                  onSort: handleSort,
                  align: "right"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SortableHeader,
                {
                  label: "Date",
                  sortKey: "deliveryDate",
                  current: sortKey,
                  dir: sortDir,
                  onSort: handleSort
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SortableHeader,
                {
                  label: "Status",
                  sortKey: "status",
                  current: sortKey,
                  dir: sortDir,
                  onSort: handleSort
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide py-3 px-6 text-right", children: "Actions" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: sorted.map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: "hover:bg-muted/20 transition-colors",
                "data-ocid": `deliveries.item.${i + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3.5 text-xs font-mono text-muted-foreground", children: [
                    "D",
                    String(Number(d.id)).padStart(4, "0")
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3.5 text-sm font-medium text-foreground", children: customerMap.get(d.customerId.toString()) ?? `#${d.customerId}` }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3.5 text-sm text-right tabular-nums text-foreground", children: Number(d.quantity) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3.5 text-sm text-right tabular-nums text-muted-foreground", children: formatCurrency(d.pricePerCan) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3.5 text-sm text-right tabular-nums font-semibold text-foreground", children: formatCurrency(d.totalAmount) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3.5 text-sm text-muted-foreground whitespace-nowrap", children: formatDate(d.deliveryDate) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusSelector, { delivery: d, index: i + 1 }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-3.5 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        variant: "ghost",
                        size: "sm",
                        onClick: () => setEditingDelivery(d),
                        "aria-label": "Edit delivery",
                        "data-ocid": `deliveries.edit_button.${i + 1}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-3.5 h-3.5" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        variant: "ghost",
                        size: "sm",
                        onClick: () => setDeletingId(d.id),
                        className: "text-destructive hover:text-destructive",
                        "aria-label": "Delete delivery",
                        "data-ocid": `deliveries.delete_button.${i + 1}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                      }
                    )
                  ] }) })
                ]
              },
              d.id.toString()
            )) })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:hidden divide-y divide-border", children: sorted.map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "p-4",
              "data-ocid": `deliveries.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground", children: [
                      "D",
                      String(Number(d.id)).padStart(4, "0"),
                      " ·",
                      " ",
                      customerMap.get(d.customerId.toString()) ?? `#${d.customerId}`
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                      Number(d.quantity),
                      " cans ×",
                      " ",
                      formatCurrency(d.pricePerCan),
                      " ·",
                      " ",
                      formatDate(d.deliveryDate)
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right flex-shrink-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-foreground", children: formatCurrency(d.totalAmount) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusSelector, { delivery: d, index: i + 1 }) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      type: "button",
                      variant: "outline",
                      size: "sm",
                      onClick: () => setEditingDelivery(d),
                      "data-ocid": `deliveries.edit_button.${i + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-3 h-3 mr-1" }),
                        " Edit"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      type: "button",
                      variant: "outline",
                      size: "sm",
                      onClick: () => setDeletingId(d.id),
                      className: "text-destructive border-destructive/30",
                      "data-ocid": `deliveries.delete_button.${i + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3 mr-1" }),
                        " Delete"
                      ]
                    }
                  )
                ] })
              ]
            },
            d.id.toString()
          )) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showAdd, onOpenChange: setShowAdd, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "deliveries.add_dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Add Delivery" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            DeliveryForm,
            {
              customers: customers ?? [],
              onSubmit: handleAdd,
              loading: addMutation.isPending,
              onCancel: () => setShowAdd(false)
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Dialog,
          {
            open: !!editingDelivery,
            onOpenChange: () => setEditingDelivery(null),
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "deliveries.edit_dialog", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Edit Delivery" }) }),
              editingDelivery && /* @__PURE__ */ jsxRuntimeExports.jsx(
                DeliveryForm,
                {
                  customers: customers ?? [],
                  initial: {
                    customerId: editingDelivery.customerId,
                    quantity: editingDelivery.quantity,
                    pricePerCan: editingDelivery.pricePerCan,
                    deliveryDate: editingDelivery.deliveryDate
                  },
                  onSubmit: handleUpdate,
                  loading: updateMutation.isPending,
                  onCancel: () => setEditingDelivery(null)
                }
              )
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AlertDialog,
          {
            open: deletingId !== null,
            onOpenChange: () => setDeletingId(null),
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "deliveries.delete_dialog", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete Delivery" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "This will permanently remove this delivery record. This action cannot be undone." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "deliveries.delete_cancel_button", children: "Cancel" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AlertDialogAction,
                  {
                    onClick: handleDelete,
                    className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                    "data-ocid": "deliveries.delete_confirm_button",
                    children: deleteMutation.isPending ? "Deleting..." : "Delete"
                  }
                )
              ] })
            ] })
          }
        )
      ]
    }
  );
}
export {
  DeliveriesPage as default
};
