import React from "react";

import { Prefer } from "../types";

// tslint:disable:no-reserved-keywords

/**
 * Maps a keyof JSX.IntrinsicElement (e.g. 'div' or 'svg') or a
 * React.ComponentType to it's type.
 *
 * For example:
 *   FromReactType<"div"> ==> HTMLDivElement
 *   FromReactType<"svg"> ==> SVGSVGElement
 *   FromReactType<React.FC<P>. ==> React.FC<P>
 */
export type FromReactType<
  T extends React.ReactType
> = T extends keyof JSX.IntrinsicElements
  ? JSX.IntrinsicElements[T] extends React.DetailedHTMLFactory<
      React.HTMLAttributes<infer U>,
      infer U
    >
    ? U
    : JSX.IntrinsicElements[T] extends React.SVGProps<infer V>
    ? V
    : never
  : T;

export type ForwardRefAsExoticComponent<
  TOwnProps,
  TDefaultComponent extends React.ReactType
> = Omit<React.ForwardRefExoticComponent<TDefaultComponent>, "defaultProps"> & {
  <TAsComponent extends React.ReactType = TDefaultComponent>(
    props: Prefer<
      { as?: TAsComponent } & TOwnProps,
      React.ComponentProps<TAsComponent>
    > &
      React.RefAttributes<
        TAsComponent extends keyof JSX.IntrinsicElements
          ? FromReactType<TAsComponent>
          : TAsComponent
      >,
  ): JSX.Element | null;
  defaultProps: {
    as: TDefaultComponent;
  } & Partial<TOwnProps & React.ComponentPropsWithoutRef<TDefaultComponent>>;
  displayName: string;
  propTypes: React.WeakValidationMap<
    {
      [k in
        | "as"
        | keyof TOwnProps
        // tslint:disable-next-line:no-any
        | keyof React.ComponentPropsWithoutRef<TDefaultComponent>]: any;
    }
  >;
};

export function forwardRefAs<
  TOwnProps,
  TDefaultComponent extends React.ReactType = React.ReactType
>(
  factory: React.RefForwardingComponent<
    HTMLElement | SVGElement | React.ComponentType,
    TOwnProps & { as: React.ReactType }
  >,
  defaultProps: Partial<
    Prefer<
      React.PropsWithoutRef<TOwnProps & { as: TDefaultComponent }> &
        React.RefAttributes<FromReactType<TDefaultComponent>>,
      React.ComponentPropsWithoutRef<TDefaultComponent>
    >
  >,
) {
  const forward = { ...React.forwardRef(factory), defaultProps };

  return forward as ForwardRefAsExoticComponent<TOwnProps, TDefaultComponent>;
}
