import { CSSProperties, forwardRef, TextareaHTMLAttributes, useCallback, useEffect, useRef } from 'react';
import { Radius, RadiusClasses } from '@/utils/styles';
import { cn } from '@/utils/utils';

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: any;
  radius?: Radius;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>((props: TextAreaProps, _ref: any) => {
  const { className, style, children, value, onChange, placeholder = 'Add prompt...', radius = 'medium', ...rest } = props;
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(() => {
    const textarea = textAreaRef.current;
    if (textarea) {
      // Reset the height to the minimum to correctly reduce the scrollHeight if needed
      textarea.style.height = 'auto';

      // Set the height to scrollHeight if there is a value, otherwise reset it to default
      let newHeight = value ? textarea.scrollHeight : textarea.offsetHeight;
      newHeight = Math.min(newHeight, 200);
      textarea.style.height = `${newHeight}px`;
    }
  }, [value]);

  useEffect(() => {
    adjustHeight();
  }, [adjustHeight, value]);

  return (
    <textarea
      ref={textAreaRef}
      tabIndex={0}
      rows={1}
      spellCheck={false}
      autoComplete="off"
      placeholder={placeholder}
      value={value}
      onChange={(e) => {
        if (onChange) onChange(e);
        adjustHeight();
      }}
      className={cn(`m-0 w-full h-auto resize-none border-0 bg-transparent py-[10px] pr-10 focus:ring-0 focus-visible:ring-0 placeholder-black/50 dark:placeholder-white/50 pl-10`, RadiusClasses(radius), className)}
      style={{
        maxHeight: '200px',
        overflowY: 'auto',
        ...style,
      }}
      {...rest}
    />
  );
});
TextArea.displayName = 'TextArea';
