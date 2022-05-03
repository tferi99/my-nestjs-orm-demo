import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { StyleClassModule } from 'primeng/styleclass';
import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { BadgeModule } from 'primeng/badge';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';
import { ChipsModule } from 'primeng/chips';
import { CodeHighlighterModule } from 'primeng/codehighlighter';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';
import { InplaceModule } from 'primeng/inplace';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { KnobModule } from 'primeng/knob';
import { LightboxModule } from 'primeng/lightbox';
import { ListboxModule } from 'primeng/listbox';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MultiSelectModule } from 'primeng/multiselect';
import { OrderListModule } from 'primeng/orderlist';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PasswordModule } from 'primeng/password';
import { PickListModule } from 'primeng/picklist';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ScrollTopModule } from 'primeng/scrolltop';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SidebarModule } from 'primeng/sidebar';
import { SkeletonModule } from 'primeng/skeleton';
import { SlideMenuModule } from 'primeng/slidemenu';
import { SliderModule } from 'primeng/slider';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SplitterModule } from 'primeng/splitter';
import { StepsModule } from 'primeng/steps';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { TerminalModule } from 'primeng/terminal';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { TimelineModule } from 'primeng/timeline';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { TreeModule } from 'primeng/tree';
import { TreeSelectModule } from 'primeng/treeselect';
import { TreeTableModule } from 'primeng/treetable';
import { VirtualScrollerModule } from 'primeng/virtualscroller';

import { AppComponent } from './app.component';
import { AppMainComponent } from './layout/app-main/app.main.component';
import { AppTopBarComponent } from './layout/app-topbar/app.topbar.component';
import { AppFooterComponent } from './layout/app-footer/app.footer.component';
import { AppConfigComponent } from './layout/app-config/app.config.component';
import { AppMenuComponent } from './layout/app-menu/app.menu.component';
import { AppMenuitemComponent } from './layout/app-menu/app.menuitem.component';

import { DashboardComponent } from './layout/components/dashboard/dashboard.component';
import { MenuService } from './layout/service/app.menu.service';
import { ConfigService } from './layout/service/app.config.service';
import { Login2Component } from './layout/components/login/login2.component';
import { ErrorComponent } from './layout/components/error/error.component';
import { NotfoundComponent } from './layout/components/notfound/notfound.component';
import { AccessComponent } from './layout/components/access/access.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { EntityDataModule } from '@ngrx/data';
import { entityConfig } from './store/entity-metadata';
import { LoggerModule } from 'ngx-logger';
import * as fromAuth from './auth/store/auth.reducer';
import * as fromNote from './features/note/store/note.reducer';
import { AuthEffects } from './auth/store/auth.effects';
import { appReducer } from './store/app.reducer';
import { MessageService } from 'primeng/api';
import { AuthModule } from './auth/auth.module';
import { InputComponent } from './sandbox/components/input/input.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LoggerModule.forRoot({
      colorScheme: ['purple', 'teal', 'gray', 'gray', 'red', 'red', 'red'],
      level: environment.logLevel,
      serverLogLevel: environment.serverLogLevel,
      disableConsoleLogging: false,
    }),


    // PrimeNG
    AccordionModule,
    AutoCompleteModule,
    AvatarModule,
    AvatarGroupModule,
    BadgeModule,
    BreadcrumbModule,
    ButtonModule,
    CalendarModule,
    CardModule,
    CarouselModule,
    CascadeSelectModule,
    ChartModule,
    CheckboxModule,
    ChipsModule,
    ChipModule,
    CodeHighlighterModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    ColorPickerModule,
    ContextMenuModule,
    DataViewModule,
    DialogModule,
    DividerModule,
    DropdownModule,
    FieldsetModule,
    FileUploadModule,
    GalleriaModule,
    ImageModule,
    InplaceModule,
    InputNumberModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    KnobModule,
    LightboxModule,
    ListboxModule,
    MegaMenuModule,
    MenuModule,
    MenubarModule,
    MessageModule,
    MessagesModule,
    MultiSelectModule,
    OrderListModule,
    OrganizationChartModule,
    OverlayPanelModule,
    PaginatorModule,
    PanelModule,
    PanelMenuModule,
    PasswordModule,
    PickListModule,
    ProgressBarModule,
    RadioButtonModule,
    RatingModule,
    RippleModule,
    ScrollPanelModule,
    ScrollTopModule,
    SelectButtonModule,
    SidebarModule,
    SkeletonModule,
    SlideMenuModule,
    SliderModule,
    SplitButtonModule,
    SplitterModule,
    StepsModule,
    TagModule,
    TableModule,
    TabMenuModule,
    TabViewModule,
    TerminalModule,
    TieredMenuModule,
    TimelineModule,
    ToastModule,
    ToggleButtonModule,
    ToolbarModule,
    TooltipModule,
    TreeModule,
    TreeSelectModule,
    TreeTableModule,
    VirtualScrollerModule,
    StyleClassModule,

    /**
     * Store options
     *
     * If you want to save non-serialiable objects in store.
     * See also: https://nils-mehlhorn.de/posts/ngrx-store-unserializable-data
     */
    StoreModule.forRoot(appReducer, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: false,    // otherwise Date cannot be used
        strictActionSerializability: false,   // otherwise Date cannot be used
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true,
      }
    }),
    StoreModule.forFeature(fromAuth.featureKey, fromAuth.reducer),
    StoreModule.forFeature(fromNote.notesFeatureKey, fromNote.reducer),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),

    EffectsModule.forRoot([]),
    EffectsModule.forFeature(
      [
        AuthEffects,
      ]
    ),
    EntityDataModule.forRoot(entityConfig),

    // features
    AuthModule,
  ],
  declarations: [
    AppComponent,
    AppMainComponent,
    AppTopBarComponent,
    AppFooterComponent,
    AppConfigComponent,
    AppMenuComponent,
    AppMenuitemComponent,
    DashboardComponent,
    Login2Component,
    ErrorComponent,
    NotfoundComponent,
    AccessComponent,

    // sandbox
    InputComponent
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    MenuService,
    ConfigService,
    MessageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
