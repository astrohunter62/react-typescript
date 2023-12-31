import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { DialogComponentProps } from '../typings';
import SimpleDialog, { SimpleDialogAction } from './SimpleDialog';

interface Props extends DialogComponentProps<boolean> {
  /** Dialog body message */
  message?: string;
}

/**
 * Dialog for navigating away from route
 */
function NavigateAwayDialog(props: Props): JSX.Element {
  const { message, onClose, onResolve, open, TransitionProps } = props;
  const { t } = useTranslation('common');

  const handleResolve = useCallback(
    async (valueOrPromise: string | PromiseLike<string> | undefined) => {
      const value = await valueOrPromise;
      onResolve(value === 'ok');
    },
    [onResolve],
  );

  const actions = useMemo((): SimpleDialogAction[] => {
    return [
      {
        id: 'cancel',
        label: t('action.cancel'),
        value: 'cancel',
      },
      {
        id: 'ok',
        label: t('action.ok'),
        value: 'ok',
      },
    ];
  }, [t]);

  return (
    <SimpleDialog
      fullWidth
      actions={actions}
      content={message}
      maxWidth="xs"
      open={!!open}
      title={t('navigatingAway')}
      TransitionProps={TransitionProps}
      onClose={onClose}
      onResolve={handleResolve}
    />
  );
}

export type NavigateAwayDialogProps = Props;
export default memo(NavigateAwayDialog);
