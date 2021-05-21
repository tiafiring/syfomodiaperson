import { KnappBaseProps } from "nav-frontend-knapper";

interface OwnProps {
  context: string;
  children: string;
}

export type TrackedButtonProps = OwnProps & KnappBaseProps;
