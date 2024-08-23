import { toast } from "react-toastify";
import { GiToaster } from "react-icons/gi";
import { FaFireBurner } from "react-icons/fa6";

interface TemplateToastProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	icon: any;
	message: string;
}

const TemplateToast = ({ icon, message }: TemplateToastProps) => {
	return (
		<div className="flex items-center">
			{icon}
			<span className="ml-6">{message}</span>
		</div>
	);
};

const success = (message: string) =>
	toast.success(
		<TemplateToast
			message={message}
			icon={<GiToaster className="text-4xl" />}
		/>,
		{
			className: "border-l-8 border-green-500",
			bodyClassName: "text-green-100",
			progressClassName: "bg-green-600",
			style: { background: "#22543d" },
		}
	);

const error = (message: string) =>
	toast.error(
		<TemplateToast
			message={message}
			icon={<FaFireBurner className="text-4xl" />}
		/>,
		{
			className: "border-l-8 border-red-500",
			bodyClassName: "text-red-100",
			progressClassName: "bg-red-600",
			style: { background: "#742a2a" },
		}
	);

const Toast = {
	success,
	error,
};

export default Toast;
