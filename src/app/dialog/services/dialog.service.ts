import {ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector} from '@angular/core';
import {DialogComponent} from '../components/dialog/dialog.component';
import {DialogModule} from '../dialog.module';
import {DialogConfig} from '../dialog-config';
import {DialogInjector} from '../dialog-injector';
import {DialogRef} from '../dialog-ref';

@Injectable({
  providedIn: DialogModule
})
export class DialogService {
  dialogComponentRefMap: Map<string, ComponentRef<DialogComponent>>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private appRef: ApplicationRef, private injector: Injector) {
    this.dialogComponentRefMap = new Map<string, ComponentRef<DialogComponent>>();
  }

  public open(componentType: any, config: DialogConfig) {
    this.appendDialogComponentToBody(config);
    this.dialogComponentRefMap.get(config.id).instance.childComponentType = componentType;
  }

  appendDialogComponentToBody(config: DialogConfig) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DialogComponent);
    const map = new WeakMap();
    map.set(DialogConfig, config);

    // add the DialogRef to dependency injection
    const dialogRef = new DialogRef();
    map.set(DialogRef, dialogRef);

    const sub = dialogRef.afterClosed.subscribe(() => {
      // close the dialog
      const id: string = config.id;
      this.removeDialogComponentFromBody(id);
      sub.unsubscribe();
    });

    const componentRef = componentFactory.create(new DialogInjector(this.injector, map));
    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    this.dialogComponentRefMap.set(config.id, componentRef);
  }

  removeDialogComponentFromBody(id: string) {
    this.appRef.detachView(this.dialogComponentRefMap.get(id).hostView);
    this.dialogComponentRefMap.get(id).destroy();
    this.dialogComponentRefMap.delete(id);
  }
}
