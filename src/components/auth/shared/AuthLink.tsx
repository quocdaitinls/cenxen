import Link, {LinkProps} from "next/link";
import {Link as LinkMui, Typography} from "@mui/material";

type AuthLinkProps = Pick<LinkProps, "href"> & {
  className: string;
  content: string;
};

const AuthLink: React.FC<AuthLinkProps> = (props) => {
  return (
    <Link href={props.href} passHref>
      <LinkMui underline='hover'>
        <Typography component='p' variant='body1' className={props.className}>
          {props.content}
        </Typography>
      </LinkMui>
    </Link>
  );
};

export default AuthLink;
