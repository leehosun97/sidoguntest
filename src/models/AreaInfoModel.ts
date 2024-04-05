export namespace AreaInfoModel {
    export interface ISiDoGunEupMyeonDongModel {
        onChange: (code: string, name: string) => void;
        siDoCode?: string;
        selectedSidoCode?: string;
        siGunGuCode?:string;
        selectedSiGunGuCode?: string;
        eupMyeonDongCode?:string;
        selectedEupMyeonDongCode?:string;
        disabled: boolean;
    }
    export interface IAreaListInfo{
        code: string;
        name: string;
        seoul?: string | undefined;
      }
}