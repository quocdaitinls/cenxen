import React, {ReactElement, useState} from "react";

type SideName = string | number | symbol;

type ContentProps = {
  [key: string]: any;
};

export type AuthSideProps<S, CP extends ContentProps = {}> = {
  changeSide: (value: S, contentProps?: CP) => void;
} & CP;

export type AuthContentSideFC<
  S extends SideName,
  CP extends ContentProps = {}
> = React.FC<AuthSideProps<S, CP>>;

export type AuthContentSideMap<
  S extends SideName,
  CP extends ContentProps = {}
> = Partial<Record<S, AuthContentSideFC<S, CP>>> | null;

export type AuthContentFC<CP extends ContentProps = {}> = React.VFC<CP>;

export const createAuthContent = <
  S extends SideName,
  CP extends ContentProps = {}
>(
  initialSide: S,
  map: AuthContentSideMap<S, CP>
) => {
  const AuthContent: AuthContentFC<CP> = (initialProps) => {
    const [side, setSide] = useState<S>(initialSide);
    const [contentProps, setContentProps] = useState<CP>(initialProps);
    let SideComponents: Partial<Record<S, ReactElement>> = {};

    const changeSide = (newSide: S, newContentProps?: CP) => {
      setSide(newSide);
      if (newContentProps) setContentProps(newContentProps);
    };

    for (let key in map) {
      SideComponents[key] = map[key]({
        ...contentProps,
        changeSide,
      });
    }

    return SideComponents[side];
  };

  return AuthContent;
};
