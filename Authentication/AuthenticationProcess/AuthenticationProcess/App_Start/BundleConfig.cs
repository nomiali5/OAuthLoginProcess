using System.Web;
using System.Web.Optimization;

namespace AuthenticationProcess
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new StyleBundle("~/Scripts/bootstrap/css/bootstrap").Include(
                        "~/Scripts/bootstrap/css/bootstrap.min.css",
                        "~/Scripts/bootstrap/css/bootstrap-responsive.min.css"
                       ));
            //Style.css
            bundles.Add(new StyleBundle("~/Content/css/style").Include(
                       "~/Content/css/style.css"));

            //GEBO style Bundle Adding
            bundles.Add(new StyleBundle("~/stylebundles/gebo").Include(
                        "~/Content/css/blue.css",
                        "~/Scripts/GeboLib/jBreadcrumbs/css/BreadCrumb.css",
                        "~/Scripts/GeboLib/qtip2/jquery.qtip.min.css",
                        "~/Scripts/GeboLib/colorbox/colorbox.css",
                        "~/Scripts/GeboLib/google-code-prettify/prettify.css",
                        "~/Scripts/GeboLib/sticky/sticky.css",

                        "~/Content/img/flags/flags.css",
                //"~/Scripts/GeboLib/fullcalendar/fullcalendar_gebo.css",
                        "~/Scripts/GeboLib/datepicker/datepicker.css",
                        "~/Scripts/GeboLib/tag_handler/css/jquery.taghandler.css"


                        ));

            //GEBO aristo style Bundle Adding
            bundles.Add(new StyleBundle("~/Scripts/GeboLib/uniform/Aristo").Include(
                        "~/Scripts/GeboLib/uniform/Aristo/uniform.aristo.css"
                         ));
            bundles.Add(new StyleBundle("~/Scripts/GeboLib/jquery-ui/css/Aristo").Include(
                         "~/Scripts/GeboLib/jquery-ui/css/Aristo/Aristo.css"));

            //Kendo style Bundle Adding
            bundles.Add(new StyleBundle("~/Scripts/kendo").Include(
                        "~/Scripts/Kendo/kendo.common.min.css",
                        "~/Scripts/Kendo/kendo.dataviz.min.css",
                        "~/Scripts/Kendo/kendo.default.min.css",
                        "~/Scripts/Kendo/kendo.dataviz.default.min.css"
                        ));

            //************************************************STYLE END*****************************************



            //************************************************SCRIPT START*****************************************

            //Bootstrap script Bundle Adding
            bundles.Add(new ScriptBundle("~/scriptbundles/bootstrap").Include(
                        "~/Scripts/bootstrap/js/bootstrap.min.js"

                        ));

            //GEBO style Bundle Adding
            bundles.Add(new StyleBundle("~/stylebundles/gebo").Include(
                        "~/Content/css/tamarillo.css",
                        "~/Scripts/GeboLib/jBreadcrumbs/css/BreadCrumb.css",
                        "~/Scripts/GeboLib/qtip2/jquery.qtip.min.css",
                        "~/Scripts/GeboLib/colorbox/colorbox.css",
                        "~/Scripts/GeboLib/google-code-prettify/prettify.css",
                        "~/Scripts/GeboLib/sticky/sticky.css",
                // "~/Content/img/splashy/splashy.css",
                        "~/Content/img/flags/flags.css",
                // "~/Scripts/GeboLib/fullcalendar/fullcalendar_gebo.css",
                        "~/Scripts/GeboLib/datepicker/datepicker.css",
                        "~/Scripts/GeboLib/tag_handler/css/jquery.taghandler.css"


                        ));
            //GEBO script Bundle Adding
            bundles.Add(new ScriptBundle("~/scriptbundles/gebo").Include(
                      "~/Scripts/Gebo/jquery.debouncedresize.min.js",
                      "~/Scripts/Gebo/jquery.actual.min.js",
                        "~/Scripts/Gebo/jquery_cookie.min.js",
                        "~/Scripts/Gebo/bootstrap.plugins.min.js",
                        "~/Scripts/GeboLib/qtip2/jquery.qtip.min.js",
                        "~/Scripts/GeboLib/jBreadcrumbs/js/jquery.jBreadCrumb.1.1.min.js",
                        "~/Scripts/GeboLib/colorbox/jquery.colorbox.min.js",
                        "~/Scripts/GeboLib/antiscroll/antiscroll.js",
                        "~/Scripts/GeboLib/antiscroll/jquery-mousewheel.js",
                        "~/Scripts/GeboLib/UItoTop/jquery.ui.totop.min.js",
                        "~/Scripts/Gebo/gebo_common.js",
                        "~/Scripts/Gebo/gebo_forms.js",
                //"~/Scripts/Gebo/gebo_calendar.js",
                        "~/Scripts/GeboLib/uniform/jquery.uniform.min.js",
                        "~/Scripts/GeboLib/tag_handler/jquery.taghandler.min.js",
                        "~/Scripts/GeboLib/jquery-ui/jquery-ui-1.8.23.custom.min.js",
                        "~/Scripts/Gebo/forms/jquery.ui.touch-punch.min.js",
                        "~/Scripts/Gebo/jquery.imagesloaded.min.js",
                        "~/Scripts/Gebo/jquery.wookmark.js",
                        "~/Scripts/Gebo/jquery.mediaTable.min.js",
                        "~/Scripts/Gebo/jquery.peity.min.js",
                        "~/Scripts/GeboLib/flot/jquery.flot.min.js",
                        "~/Scripts/GeboLib/flot/jquery.flot.resize.min.js",
                        "~/Scripts/GeboLib/flot/jquery.flot.pie.min.js",
                // "~/Scripts/GeboLib/fullcalendar/fullcalendar.min.js",
                        "~/Scripts/GeboLib/list_js/list.min.js",
                        "~/Scripts/GeboLib/list_js/plugins/paging/list.paging.js",
                        "~/Scripts/Gebo/gebo_dashboard.js",
                        "~/Scripts/GeboLib/complexify/jquery.complexify.min.js",
                        "~/Scripts/GeboLib/datepicker/bootstrap-datepicker.min.js",
                        "~/Scripts/GeboLib/datepicker/bootstrap-timepicker.min.js",
                        "~/Scripts/Gebo/forms/jquery.spinners.min.js",
                        "~/Scripts/GeboLib/datatables/jquery.dataTables.min.js",
                        "~/Scripts/GeboLib/datatables/extras/Scroller/media/js/Scroller.min.js"
                        ));

            //Jquery script Bundle Adding
            bundles.Add(new ScriptBundle("~/scriptbundles/jquery").Include(
                    "~/Scripts/jquery.validate.js"));

            //Kendo script Bundle Adding
            bundles.Add(new ScriptBundle("~/Scripts/kendo").Include(
                     "~/Scripts/kendo/kendo.all.min.js",
                     "~/Scripts/kendo/kendo.aspnetmvc.min.js"
                     ));
            //************************************************SCRIPT END*****************************************
            BundleTable.EnableOptimizations = true;

        }
    }
}
