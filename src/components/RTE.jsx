import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";

function RTE({ control, name, defaultValues = "" }) {
  return (
    <div>
      <Controller
        name={name || "content"}
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange } }) => (
          <Editor
          apiKey="1ufdrwisc3mfrnu5z0a4pmrplj5581tdfyibs9mrijg0bi56"
            initialValue={defaultValues}
            init={{
              height: 400,
              menubar: true,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}

export default RTE;
