import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { isValidElement, memo, ReactNode } from 'react';
import { useRefFocus } from '../hooks';
import { DialogComponentProps } from '../typings';

export interface SimpleDialogAction {
  /** Unique key for the button */
  id: string | number;
  /** Label for the button */
  label: ReactNode;
  /** Value to resolve when user clicks this button */
  value?: string;
  /** Whether button should be automatically focused when dialog opens */
  autoFocus?: boolean;
}

interface Props extends DialogComponentProps<string>, Pick<DialogProps, 'fullWidth' | 'maxWidth'> {
  /** Dialog title */
  title?: ReactNode;
  /** Dialog body message */
  content?: ReactNode;
  /** Action buttons */
  actions: SimpleDialogAction[];
}

/**
 * Render dialog with text message and buttons
 */
function SimpleDialog(props: Props): JSX.Element {
  const { actions, content, maxWidth, onResolve, title, ...otherProps } = props;
  const [buttonRef, focusButton] = useRefFocus<HTMLButtonElement>();

  return (
    <Dialog
      {...otherProps}
      TransitionProps={{
        ...otherProps.TransitionProps,
        onEnter: focusButton,
      }}
    >
      {title && <DialogTitle>{title}</DialogTitle>}
      {content && (
        <DialogContent>
          {isValidElement(content) ? content : <DialogContentText>{content}</DialogContentText>}
        </DialogContent>
      )}
      <DialogActions>
        {actions.map((action) => (
          <Button
            key={action.id}
            ref={action.autoFocus ? buttonRef : undefined}
            color="primary"
            onClick={() => {
              onResolve(action.value);
            }}
          >
            {action.label}
          </Button>
        ))}
      </DialogActions>
    </Dialog>
  );
}

export type SimpleDialogProps = Props;
export default memo(SimpleDialog);
