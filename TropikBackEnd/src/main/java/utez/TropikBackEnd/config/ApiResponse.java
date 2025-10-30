package utez.TropikBackEnd.config;

import utez.TropikBackEnd.utils.TypesResponse;

public class ApiResponse {

    private String text;
    private Object data;
    private TypesResponse type;

    public ApiResponse(){}

    public ApiResponse(String text, TypesResponse type) {
        this.text = text;
        this.type = type;
    }

    public ApiResponse(String text, Object data, TypesResponse type){
        this.text = text;
        this.data = data;
        this.type = type;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public TypesResponse getType() {
        return type;
    }

    public void setType(TypesResponse type) {
        this.type = type;
    }
}
