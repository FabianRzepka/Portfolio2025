export function copyToClipboard(
  toCopy: string,
  message: string = "Skopiowano",
) {
  const toast = useToast();
  navigator.clipboard.writeText(toCopy).then(() => {
    toast.add({
      title: message,
      color: "primary",
      icon: "i-lucide-check-circle",
    });
  });
}
