import appInput from './app-input.vue'
import appDialog from './app-dialog.vue'
import appAutocomplete from './app-autocomplete.vue'
import appBack from './app-back.vue'
import appButton from './app-button.vue'
import appCondition from './app-condition.vue'
import appForm from './app-form'
import appFormItem from './app-formitem'
import appTab from './app-tab'
import appFileInput from './app-file-input.vue'
import appPage from './app-page.vue'
import appSelect from './app-select.vue'
import appTable from './app-table.vue'
import appTableAutocomplete from './app-table-autocomplete.vue'

export function createComponent (Vue) {
    Vue.component('app-input', appInput);
    Vue.component('app-form', appForm);
    Vue.component('app-tab', appTab);
    Vue.component('app-formitem', appFormItem);
    Vue.component('app-dialog', appDialog);
    Vue.component('app-autocomplete', appAutocomplete);
    Vue.component('app-back', appBack);
    Vue.component('app-button', appButton);
    Vue.component('app-condition', appCondition);
    Vue.component('app-file-input', appFileInput);
    Vue.component('app-page', appPage);
    Vue.component('app-select', appSelect);
    Vue.component('app-table', appTable);
    Vue.component('app-table-autocomplete', appTableAutocomplete);
}