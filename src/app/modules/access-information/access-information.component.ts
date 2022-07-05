import { Component, OnInit } from '@angular/core';
import { AccessInfoService } from 'src/app/core/service/access-info.service';

@Component({
  selector: 'access-information',
  templateUrl: './access-information.component.html',
  styleUrls: ['./access-information.component.scss'],
})
export class AccessInformationComponent implements OnInit {
  infos: any[] = [
    {
      id: 1,
      name: 'خدمات إدارية',
      description:
        'الخدمات العموميّة هي كلّ خدمة تقدّمها المؤسّسات العموميّة للعموم أو جهة معيّنة تحت اشراف الدولة ورقابتها وهي تهدف إلى المنفعة العامّة مثل المحافظة على الممتلكات أو الدفع بالحركيّة الإقتصاديّة أو المصالح الحياتيّة للمواطنين. لذلك فإنّ المؤسّسات العموميّة مقسّمة حسب اختصاصاتها وهنا يمكن ذكر البعض منها وبعض الخدمات التي تقدّمها',
    },
    {
      id: 2,
      name: 'خدمات الإتصال',
      description:
        'الاتصالات هي جمع اتصال، وهي عمليّة من العمليات الاجتماعيّة التي ظهرت مع الإنسان منذ بداية حياته ووجوده على الأرض، حيث كان الاتصال في البداية مباشراً وبسيطاً، وكان يستهدف إشباع حاجات الإنسان الأساسيّة، ثم تطوّر شيئاً فشيئاً وازداد تعقيداً مع تطوّر حياة الإنسان، حتى وصل إلى أعلى المستويات في عصرنا الحديث. ويُشير مصطلح الاتصال إلى تحقيق هدف الإنسان وبلوغ غايته التي يطمح إليها، كما يُمكن تعريفه على أنه عمليّة تبادل المعلومات والأفكار ووجهات النظر ما بين طرفين أو أكثر، بواسطة أساليب وطرق ووسائل متعددة، مثل: الكلام، والكتابة، والقراءة، والإشارة، وغيرها من الوسائل الأخرى. وبناءً على ما تقدم يُمكننا تلخيص مفهوم الاتصالات: بأنها عمليّة نقل وتلقّي المعلومات والآراء والأفكار، بالإضافة إلى تبادل المهارات بهدف التأثير في الآخرين.',
    },
    {
      id: 3,
      name: 'خدمات الإجتماعية',
      description:
        'الخدمات العموميّة هي كلّ خدمة تقدّمها المؤسّسات العموميّة للعموم أو جهة معيّنة تحت اشراف الدولة ورقابتها وهي تهدف إلى المنفعة العامّة مثل المحافظة على الممتلكات أو الدفع بالحركيّة الإقتصاديّة أو المصالح الحياتيّة للمواطنين. لذلك فإنّ المؤسّسات العموميّة مقسّمة حسب اختصاصاتها وهنا يمكن ذكر البعض منها وبعض الخدمات التي تقدّمها        ',
    },
    {
      id: 4,
      name: 'خدمات الفنية',
      description:
        'الاتصالات هي جمع اتصال، وهي عمليّة من العمليات الاجتماعيّة التي ظهرت مع الإنسان منذ بداية حياته ووجوده على الأرض، حيث كان الاتصال في البداية مباشراً وبسيطاً، وكان يستهدف إشباع حاجات الإنسان الأساسيّة، ثم تطوّر شيئاً فشيئاً وازداد تعقيداً مع تطوّر حياة الإنسان، حتى وصل إلى أعلى المستويات في عصرنا الحديث. ويُشير مصطلح الاتصال إلى تحقيق هدف الإنسان وبلوغ غايته التي يطمح إليها، كما يُمكن تعريفه على أنه عمليّة تبادل المعلومات والأفكار ووجهات النظر ما بين طرفين أو أكثر، بواسطة أساليب وطرق ووسائل متعددة، مثل: الكلام، والكتابة، والقراءة، والإشارة، وغيرها من الوسائل الأخرى. وبناءً على ما تقدم يُمكننا تلخيص مفهوم الاتصالات: بأنها عمليّة نقل وتلقّي المعلومات والآراء والأفكار، بالإضافة إلى تبادل المهارات بهدف التأثير في الآخرين.',
    },
  ];
  info: any = this.infos[0];

  constructor(private accessInfoService: AccessInfoService) {}

  ngOnInit(): void {
    this.accessInfoService.getInfos().subscribe((res) => (this.infos = res));
  }

  selectInfo(info: any) {
    this.info = info;
  }
}