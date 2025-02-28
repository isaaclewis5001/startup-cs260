import { NavigateFunction, useNavigate } from "react-router-dom";
import { ReactNode } from "react";

export function FormWrapper<C>({form, action}: {form: Form<C>, action: FormAction<C>}) {
  const navigator = useNavigate();
  
  async function onClick() {
    const maybePayload = form.getPayloadOrError();
    if ('errMsg' in maybePayload) {
      // TODO: do something with this to let the user know what they did wrong
      console.log(maybePayload.errMsg)
      return;
    }


    // TODO: actually perform a fetch
    await new Promise(resolve => setTimeout(resolve, 500));
    await action.act(maybePayload.context, new Response("FormWrapper.tsx mock fetch", {status: 418}), navigator);
  }
  
  return (
    <form className="formcard" action={"javacript:void(0);"}>
      <form.create>
        <button onClick={onClick}>{form.submitButtonText}</button>
      </form.create>
    </form>
  )
}

export function getFieldById(id: string): string | undefined {
  return getFieldByIdNoTrim(id)?.trim();
}

export function getFieldByIdNoTrim(id: string): string | undefined {  
  return (document.getElementById(id) as HTMLInputElement | null)?.value;
}

export interface Form<C> {
  create(props: {children: ReactNode}): ReactNode;
  getPayloadOrError(): {payload: any, context: C} | {errMsg: string};
  url: string;
  submitButtonText: string;
}

export interface FormAction<C> {
  act(context: C, response: Response, navigator: NavigateFunction): Promise<string | null>;
}

