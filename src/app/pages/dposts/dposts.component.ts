import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DPostService } from '../../services/dposts.service';

@Component({
  selector: 'app-dposts',
  templateUrl: './dposts.component.html',
  styleUrls: ['./dposts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DpostsComponent {
  posts$ = this.postService.posts$;

  constructor(private postService: DPostService) {}
}
