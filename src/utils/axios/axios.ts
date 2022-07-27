/*
 * @Descripttion:
 * @version:
 * @Author: captern@icloud.com
 * @Date: 2022-07-11 16:40:14
 * @LastEditors: captern
 * @LastEditTime: 2022-07-27 14:52:42
 */
import { AxiosRequestConfig, AxiosStatic } from "./types";
import { extend } from "./helpers/utils";
import Axios from "./core/Axios";
import defaults from "./defaults";
import mergeConfig from "./core/mergeConfig";
import CancelToken from "./cancel/CancelToken";
import Cancel, { isCancel } from "./cancel/Cancel";

// function createInstance(config: AxiosRequestConfig): AxiosInstance {
function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config);
  const instance = Axios.prototype.request.bind(context);
  extend(instance, context);
  return instance as AxiosStatic;
}
const axios = createInstance(defaults);

axios.create = function create(config) {
  return createInstance(mergeConfig(defaults, config));
};

axios.CancelToken = CancelToken;
axios.Cancel = Cancel;
axios.isCancel = isCancel;
export default axios;
