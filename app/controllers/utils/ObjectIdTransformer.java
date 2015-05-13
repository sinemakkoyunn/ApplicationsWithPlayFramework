package controllers.utils;

import flexjson.transformer.AbstractTransformer;

public class ObjectIdTransformer extends AbstractTransformer{
    @Override
    public void transform(Object o) {
        getContext().writeQuoted(o.toString());
    }
}
