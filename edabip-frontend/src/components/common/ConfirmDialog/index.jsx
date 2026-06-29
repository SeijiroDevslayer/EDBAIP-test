function ConfirmDialog({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null;
  return <div>Confirm?</div>;
}

export default ConfirmDialog;
