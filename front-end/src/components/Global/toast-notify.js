import { toast } from "react-toastify";

/**
 *
 * @param {string} type //the type like : success, error ,warning
 * @param {*} text  // text on the toast
 */
export function notify(type, text) {
  switch (type) {
    case "success": {
      toast.success(text);
      break;
    }
    case "error": {
      toast.error(text);
      break;
    }
    case "warning": {
      toast.warning(text);
      break;
    }
  }
}
